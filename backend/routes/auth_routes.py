from flask import Blueprint, request, jsonify
from models.user_model import UserModel
from utils.auth_utils import hash_password, verify_password, generate_token
from extensions import mongo

# ✅ STEP 1: DEFINE Blueprint FIRST
auth_bp = Blueprint("auth", __name__)

# ✅ STEP 2: user_model setup
user_model = None

def get_user_model():
    global user_model
    if user_model is None:
        user_model = UserModel(mongo)
    return user_model


# =========================
# ✅ REGISTER ROUTE
# =========================
@auth_bp.route("/register", methods=["POST"])
def register():
    user_model = get_user_model()
    data = request.get_json()

    if user_model.find_by_email(data["email"]):
        return jsonify({"error": "User already exists"}), 400

    hashed = hash_password(data["password"])

    user_model.create_user({
        "name": data["name"],
        "email": data["email"],
        "password": hashed
    })

    return jsonify({"message": "User registered"})


# =========================
# ✅ LOGIN ROUTE
# =========================
@auth_bp.route("/login", methods=["POST"])
def login():
    user_model = get_user_model()
    data = request.get_json()

    print("\n===== LOGIN DEBUG =====")
    print("DATA:", data)

    user = user_model.find_by_email(data.get("email"))
    print("USER:", user)

    if not user:
        return jsonify({"error": "User not found"}), 404

    if not verify_password(data.get("password"), user.get("password")):
        return jsonify({"error": "Invalid credentials"}), 401

    print("✅ LOGIN SUCCESS")

    token = generate_token(user)
    return jsonify({"token": token})