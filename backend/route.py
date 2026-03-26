from flask import Blueprint, request, jsonify
from model import create_task, get_tasks, update_task, delete_task

task_routes = Blueprint("task_routes", __name__)

@task_routes.route("/tasks", methods=["GET"])
def fetch_tasks():
    return jsonify(get_tasks())

@task_routes.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    create_task(data)
    return jsonify({"msg": "Task created"})

@task_routes.route("/tasks/<id>", methods=["PUT"])
def edit_task(id):
    data = request.json
    update_task(id, data)
    return jsonify({"msg": "Task updated"})

@task_routes.route("/tasks/<id>", methods=["DELETE"])
def remove_task(id):
    delete_task(id)
    return jsonify({"msg": "Task deleted"})
