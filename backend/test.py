import requests
import os

import google.generativeai as genai

# Manually configure Gemini API key
genai.configure(api_key="AIzaSyBHtgjlu6ALEoEHVSM9g3WoeHJ_gDMUa7Y")

API_BASE = "http://localhost:8000"

# 1. Upload
def test_upload(path_to_file):
    with open(path_to_file, "rb") as f:
        files = {"file": f}
        res = requests.post(f"{API_BASE}/upload", files=files)
    print("Upload Summary:", res.json())
    return res.json().get("summary")

# 2. Chat
def test_chat(summary, question):
    payload = {
        "financial_summary": summary,
        "question": question
    }
    res = requests.post(f"{API_BASE}/chat", json=payload)

    print("\n🔁 Raw Response Text:")
    print(res.text)

    try:
        chat_data = res.json()
        if "response" in chat_data:
            print("\n✅ AI Response:", chat_data["response"])
        elif "error" in chat_data:
            print("\n❌ Gemini API Error:", chat_data["error"])
        else:
            print("\n❌ Unexpected response format:", chat_data)
    except Exception as e:
        print("❌ JSON decode failed:", e)
        print("Raw response was:", res.text)

if __name__ == "__main__":
    print("🧾 Uploading bank statement...")
    summary = test_upload(r"C:\MAIN\Code\Finora\finora\backend\test_files\Acct Statement_XX0613_12042025.pdf")
    print("\n📝 Financial Summary:")
    print("\n💬 Asking financial question...")
    test_chat(summary, "How can I budget better and repay my debts faster?")
