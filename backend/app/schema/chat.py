from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Userbase(BaseModel):
    name: str
    
class MessageBase(BaseModel):
    content: str
    is_bot: bool = False
    user_id: int
    
class Message(MessageBase):
    id: int
    user_id: int
    content: str
    is_bot: bool
    created_at: datetime
    class Config:
        from_attributes = True
        
class User(Userbase):
    id: int
    created_at: datetime
    messages: List[Message] = []
    class Config:
        from_attributes = True
        
class UserCreate(Userbase):
    name: str

class MessageCreate(MessageBase):
    user_id: int
    content: str
    is_bot: bool = False