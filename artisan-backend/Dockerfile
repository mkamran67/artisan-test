# Steps for creating the custom image

# Base Image
FROM python:3.12.3

# Working Directory
WORKDIR /app

COPY requirements.txt .

# Command to run
RUN pip install --no-cache-dir -r requirements.txt

# Copy from source directory to WORKDIR
COPY . .

# Commands with space in between must be separated
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]