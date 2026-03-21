import bcrypt
import jwt
from datetime import datetime, timedelta
from config import Config

def hash_password(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode(), hashed)

def generate_token(user):
    payload = {
        "user_id": str(user["_id"]),
        "role": user.get("role", "user"),
        "exp": datetime.utcnow() + timedelta(hours=2)
    }
    return jwt.encode(payload, Config.SECRET_KEY, algorithm="HS256")
