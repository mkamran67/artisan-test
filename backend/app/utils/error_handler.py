from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException


from main import app

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
  return JSONResponse(
    status_code=exc.status_code,
    content={"message": exc.detail}
  )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
  #  422 or 400
  return JSONResponse(
    status_code=422, 
    content={"message": "Validation error", "details": exc.errors()}
  )
  
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
  return JSONResponse(
    status_code=500,
    content={"message": "Server error"}
  )