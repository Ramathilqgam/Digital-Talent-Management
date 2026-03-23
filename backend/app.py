from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import mongo

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    mongo.init_app(app)
    CORS(app)

    # ✅ ADD THIS HERE
    @app.route("/")
    def home():
        return "Backend is running successfully 🚀"

    # Routes
    from routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    from routes.task_routes import task_bp
    app.register_blueprint(task_bp, url_prefix="/api/tasks")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)