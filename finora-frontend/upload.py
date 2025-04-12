from fastapi import FastAPI, File, UploadFile
from pathlib import Path

app = FastAPI()

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Save the uploaded file
    file_location = Path(f"uploaded_files/{file.filename}")
    with open(file_location, "wb") as f:
        f.write(file.file.read())
    return {"filename": file.filename}
