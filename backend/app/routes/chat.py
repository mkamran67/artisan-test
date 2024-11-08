from operator import and_
from fastapi import APIRouter, Depends, HTTPException, status
from h11 import Response
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.services.openai_api import get_chat_response
from ..models.chat import User, Message
from ..schema.chat import MessageUpdate, UserCreate, MessageCreate, User as UserResponse, Message as MessageResponse

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
  
@router.post("/message/new", response_model=MessageResponse)
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

@router.delete("/messages/{user_id}/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_messages(user_id: int, message_id: int, db: Session = Depends(get_db)):
  try:
    tobeDeletedMessage = db.query(Message).filter(and_(Message.user_id == user_id, Message.id == message_id)).first()
    
    if tobeDeletedMessage:
      db.delete(tobeDeletedMessage)
      db.commit()
    else:
      raise HTTPException(status_code=404, detail="Message not found")
      
    return Response(status_code=status.HTTP_204_NO_CONTENT, headers={})
    
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))

 
@router.put("/message", response_model=MessageResponse)
async def update_message(incomingMessage: MessageUpdate, db: Session = Depends(get_db)):
  try:
    
    tobeUpdatedMessage = db.query(Message).filter(and_(Message.user_id == incomingMessage.user_id, Message.id == incomingMessage.id)).first()
    
    if tobeUpdatedMessage:
      tobeUpdatedMessage.content = incomingMessage.content
      db.commit()
      db.refresh(tobeUpdatedMessage)
    else:
      raise HTTPException(status_code=404, detail="Message not found")
    return tobeUpdatedMessage
  except Exception as e:
    db.rollback()
    raise HTTPException(status_code=500, detail=str(e))
