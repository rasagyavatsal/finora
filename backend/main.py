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
        You are a friendly and knowledgeable financial assistant. Respond naturally and conversationally.

        Financial Summary:
        {query.financial_summary}

        User's Question:
        {query.question}

        Provide a clear, concise, and helpful response. If appropriate, ask a follow-up question to keep the conversation going.
        """
        response = model.generate_content(prompt)
        follow_up = "Is there anything else you'd like to know about your finances?"
        full_response = f"{response.text.strip()} {follow_up}"
        return {"response": full_response}
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
async def upload_file(file: UploadFile):
    try:
        # Simulate processing the file and generating a summary
        content = await file.read()
        summary = "Income: $5000\nExpenses: $2000\nSavings: $3000"
        return {"summary": summary}
    except Exception as e:
        return {"error": f"Failed to process file: {str(e)}"}
