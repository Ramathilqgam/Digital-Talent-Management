from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

SECRET_KEY = "your_secret_key"


# ✅ Hash password (for register)
def hash_password(password):
    return generate_password_hash(password)


# ✅ Verify password (for login)
def verify_password(password, hashed):
    return check_password_hash(hashed, password)


# ✅ Generate JWT token
def generate_token(user):
    payload = {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    # 🔥 IMPORTANT FIX (for compatibility)
    if isinstance(token, bytes):
        token = token.decode("utf-8")

    return token