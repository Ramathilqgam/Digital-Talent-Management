from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import mongo


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # ✅ Initialize MongoDB
    mongo.init_app(app)

    # ✅ Enable CORS (important for React)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # ✅ Health check route
    @app.route("/")
    def home():
        return {"message": "Backend is running successfully 🚀"}

    # =========================
    # ✅ Register Blueprints
    # =========================

    # 🔹 Auth Routes
    from routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    # 🔹 Task Routes
    from routes.task_routes import task_bp
    app.register_blueprint(task_bp, url_prefix="/api/tasks")

    return app


# =========================
# ✅ Run Server
# =========================
if __name__ == "__main__":
    app = create_app()

    print("🚀 Server running at http://127.0.0.1:5000")

    app.run(host="127.0.0.1", port=5000, debug=True)