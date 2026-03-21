import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    MONGO_URI = MONGO_URI = "mongodb://localhost:27017/digital_talent_db"
