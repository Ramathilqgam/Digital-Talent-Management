from flask import Blueprint, request, jsonify
from models.user_model import UserModel
from utils.auth_utils import hash_password, verify_password, generate_token
from extensions import mongo   # ✅ USE THIS

auth_bp = Blueprint("auth", __name__)

user_model = None


def get_user_model():
    global user_model
    if user_model is None:
        user_model = UserModel(mongo)
    return user_model


@auth_bp.route("/register", methods=["POST"])
def register():
    user_model = get_user_model()
    data = request.get_json()

    print("REGISTER DATA:", data)   # ✅ debug

    if user_model.find_by_email(data["email"]):
        return jsonify({"error": "User already exists"}), 400

    hashed = hash_password(data["password"])

    user_model.create_user({
        "name": data["name"],
        "email": data["email"],
        "password": hashed,
        "role": "user"
    })

    return jsonify({"message": "User registered"})


@auth_bp.route("/login", methods=["POST"])
def login():
    user_model = get_user_model()
    data = request.get_json()

    user = user_model.find_by_email(data["email"])
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not verify_password(data["password"], user["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    token = generate_token(user)

    return jsonify({"token": token})