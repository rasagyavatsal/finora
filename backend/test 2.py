import google.generativeai as genai

genai.configure(api_key="AIzaSyBHtgjlu6ALEoEHVSM9g3WoeHJ_gDMUa7Y")
model = genai.GenerativeModel("gemini-1.5-flash")

res = model.generate_content("Give me a budgeting tip.")
print(res.text)