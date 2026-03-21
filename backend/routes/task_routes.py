from flask import Blueprint, request, jsonify
from app import mongo
from models.task_model import TaskModel

task_bp = Blueprint("tasks", __name__)
task_model = TaskModel(mongo)


# CREATE TASK
@task_bp.route("/", methods=["POST"])
def create_task():
    try:
        data = request.get_json()

        required_fields = ["title", "description"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        task_data = {
            "title": data["title"],
            "description": data["description"],
            "assigned_to": data.get("assigned_to"),
            "status": "pending"
        }

        result = task_model.create_task(task_data)

        return jsonify({
            "message": "Task created successfully",
            "task_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# GET ALL TASKS
@task_bp.route("/", methods=["GET"])
def get_tasks():
    try:
        tasks = task_model.get_all_tasks()
        return jsonify([task_model.to_json(t) for t in tasks]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# GET TASK BY ID
@task_bp.route("/<task_id>", methods=["GET"])
def get_task(task_id):
    try:
        task = task_model.get_task_by_id(task_id)

        if not task:
            return jsonify({"error": "Task not found"}), 404

        return jsonify(task_model.to_json(task)), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# UPDATE TASK
@task_bp.route("/<task_id>", methods=["PUT"])
def update_task(task_id):
    try:
        data = request.get_json()

        task = task_model.get_task_by_id(task_id)
        if not task:
            return jsonify({"error": "Task not found"}), 404

        task_model.update_task(task_id, data)

        return jsonify({"message": "Task updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# DELETE TASK
@task_bp.route("/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    try:
        task = task_model.get_task_by_id(task_id)
        if not task:
            return jsonify({"error": "Task not found"}), 404

        task_model.delete_task(task_id)

        return jsonify({"message": "Task deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500