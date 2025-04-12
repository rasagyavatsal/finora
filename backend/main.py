# FastAPI server with Gemini integration

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import google.generativeai as genai
import os
import io
import pdfplumber
import re

# Initialize Gemini client
genai.configure(api_key="AIzaSyBHtgjlu6ALEoEHVSM9g3WoeHJ_gDMUa7Y")
model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load macroeconomic debt datasets at startup
debt_data = {}
for name, path in {
    "household": "datasets/household_debt.csv",
    "private": "datasets/private_debt.csv",
    "central_gov": "datasets/central_government_debt.csv",
    "non_fin_corp": "datasets/non-financial_corporate_debt.csv",
    "general_gov": "datasets/general_government_debt.csv"
}.items():
    try:
        debt_data[name] = pd.read_csv(path).tail(1).to_dict("records")[0]
    except Exception as e:
        debt_data[name] = {"error": str(e)}

class UserQuery(BaseModel):
    question: str
    financial_summary: str

@app.post("/chat")
async def chat_with_gemini(query: UserQuery):
    print("Received question:", query.question)
    print("Financial summary:", query.financial_summary)
    try:
        debt_context = "\n".join(
            [f"{k.replace('_', ' ').title()} Debt: {v}" for k, v in debt_data.items() if isinstance(v, dict)]
        )
        prompt = f"""
        The user has asked a financial question. Here's their financial snapshot:
        {query.financial_summary}

        Current macroeconomic debt data:
        {debt_context}

        Question: {query.question}

        Give clear, practical advice on budgeting, debt repayment, and saving strategies considering both personal and national debt trends.
        """
        response = model.generate_content(prompt)
        return {"response": response.text.strip()}
    except Exception as e:
        print("❌ Gemini API error:", e)
        return {"error": str(e)}

def extract_transactions_from_text(text):
    transactions = []
    lines = text.splitlines()
    for line in lines:
        match = re.match(r"^(\d{2}/\d{2}/\d{2})\s+(.*?)\s+(\d{2}/\d{2}/\d{2})\s+([\d,]*\.?\d*)?\s*([\d,]*\.?\d*)?\s+([\d,]*\.?\d*)$", line)
        if match:
            date = match.group(1)
            description = match.group(2).strip()
            withdrawal = match.group(4).replace(",", "") if match.group(4) else ""
            deposit = match.group(5).replace(",", "") if match.group(5) else ""
            balance = match.group(6).replace(",", "") if match.group(6) else ""
            transactions.append({
                "Date": date,
                "Description": description,
                "Withdrawal": float(withdrawal) if withdrawal else 0.0,
                "Deposit": float(deposit) if deposit else 0.0,
                "Balance": float(balance) if balance else 0.0,
            })
    return pd.DataFrame(transactions)

@app.post("/upload")
async def upload_statement(file: UploadFile = File(...)):
    contents = await file.read()
    filename = file.filename.lower()

    if filename.endswith(".csv"):
        df = pd.read_csv(io.BytesIO(contents))
    elif filename.endswith(".xlsx"):
        df = pd.read_excel(io.BytesIO(contents))
    elif filename.endswith(".pdf"):
        text_data = ""
        with pdfplumber.open(io.BytesIO(contents)) as pdf:
            for page in pdf.pages:
                text_data += page.extract_text() + "\n"
        df = extract_transactions_from_text(text_data)
    else:
        return {"summary": "Unsupported file format."}

    if 'Withdrawal' in df.columns and 'Deposit' in df.columns:
        income = df['Deposit'].sum()
        expenses = df['Withdrawal'].sum()
        summary = f"Monthly Income: ${income:.2f}, Monthly Expenses: ${expenses:.2f}"
    else:
        summary = "Invalid format: File must include 'Withdrawal' and 'Deposit' columns."

    return {"summary": summary}
