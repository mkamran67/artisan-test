import os
from typing import Union
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
# from starlette.middleware.cors import CORSMiddleware

from app.utils.env_setup import check_for_env_vars

# loads envs from .env file
load_dotenv();

# Checks for envs, raises error if not found
check_for_env_vars();


app = FastAPI()

# Assuming it's a public api
  # "https://localhost:3000",
origins = [
  "*",
]

# Adds headers to the browser to allow CORS + specific origin
app.add_middleware(
  CORSMiddleware,
  allow_credentials=True,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
)

# Our router routes will be added here
# NOTE -> normally there would be some form of auth in the middleware to processes protected routes
from .routes import chat
app.include_router(chat.router)


@app.get("/")
async def read_root():
    return {"message" : "Hello World"}
  
  
if __name__== "__main__":
    port = int(os.environ.get("PORT", 8000))  # Use Heroku's port if available, otherwise default to 8000
    uvicorn.run(app, host="0.0.0.0", port=port)