from flask import Blueprint, request, jsonify
from bson import ObjectId
from models.task_model import TaskModel
from extensions import mongo

task_bp = Blueprint("tasks", __name__)

task_model = TaskModel(mongo)


# ➕ CREATE TASK
@task_bp.route("/", methods=["POST"])
def create_task():
    data = request.get_json()

    task = {
        "title": data["title"],
        "description": data["description"],
        "status": "pending"
    }

    result = task_model.create_task(task)

    return jsonify({"message": "Task created", "id": str(result.inserted_id)})


# 📋 GET ALL TASKS
@task_bp.route("/", methods=["GET"])
def get_tasks():
    tasks = task_model.get_tasks()

    for task in tasks:
        task["_id"] = str(task["_id"])

    return jsonify(tasks)


# ✏️ UPDATE TASK
@task_bp.route("/<id>", methods=["PUT"])
def update_task(id):
    data = request.get_json()

    task_model.update_task(
        ObjectId(id),
        data
    )

    return jsonify({"message": "Task updated"})


# ❌ DELETE TASK
@task_bp.route("/<id>", methods=["DELETE"])
def delete_task(id):
    task_model.delete_task(ObjectId(id))

    return jsonify({"message": "Task deleted"})