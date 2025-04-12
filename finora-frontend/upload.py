from fastapi import FastAPI, File, UploadFile
from pathlib import Path

# Create the FastAPI app
app = FastAPI()

# Define a basic root route
@app.get("/")
async def root():
    return {"message": "Welcome to the file upload API!"}

# Define the file upload route
@app.post("/upload-bank-statement/")
async def upload_file(file: UploadFile = File(...)):
    # Define the upload folder
    upload_folder = Path("uploads")
    upload_folder.mkdir(parents=True, exist_ok=True)  # Ensure folder exists

    # Define the file location to save the uploaded file
    file_location = upload_folder / file.filename
    
    # Save the uploaded file
    with open(file_location, "wb") as f:
        f.write(file.file.read())
    
    return {"filename": file.filename, "message": "File uploaded successfully!"}
