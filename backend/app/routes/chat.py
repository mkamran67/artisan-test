from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.services.openai_api import get_chat_response
from ..models.chat import User, Message
from ..schema.chat import UserCreate, MessageCreate, User as UserResponse, Message as MessageResponse

import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/chat",
    tags=["chat"]
)

@router.post("/user/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
  try:
    db_user = User(name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
  except Exception as e:
    db.rollback()
    if "unique constraint" in str(e).lower():
      return db.query(User).filter(User.name == user.name).first()
    raise HTTPException(status_code=500, detail=str(e))

@router.get("/messages/{user_id}", response_model=List[MessageResponse])
async def get_user_messages(user_id: int, db: Session = Depends(get_db)):
  try:
    messages = db.query(Message).filter(Message.user_id == user_id).order_by(Message.created_at.asc()).all()
    return messages
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))
  
@router.post("/message/", response_model=MessageResponse)
async def create_message(message: MessageCreate, db: Session = Depends(get_db)):
  try:
    message = Message(**message.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    
    # if it's a user message get a API response
    if not message.is_bot:
      logger.info(f"Got user message: {message.content}")
      response = get_chat_response(message.content)
      logger.info(f"Got response from OpenAI: {response}")
      bot_message = Message(user_id=message.user_id, content=response, is_bot=True)
      db.add(bot_message)
      db.commit()
      db.refresh(bot_message)
      return bot_message
    return message
  except Exception as e:
    db.rollback()
    raise HTTPException(status_code=500, detail=str(e))

@router.delete("/messages/{user_id}/{message_id}", response_model=List[MessageResponse])
async def delete_user_messages(user_id: int, db: Session = Depends(get_db)):
  try:
    messages = db.query(Message).filter(Message.user_id == user_id).order_by(Message.created_at.asc()).all()
    return messages
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))
  