from typing import Dict, List
from bson import ObjectId

class TaskModel:
    def __init__(self, mongo):
        self.collection = mongo.db.tasks

    # CREATE TASK
    def create_task(self, task_data: Dict):
        return self.collection.insert_one(task_data)

    # GET ALL TASKS
    def get_all_tasks(self) -> List[Dict]:
        return list(self.collection.find())

    # GET TASK BY ID
    def get_task_by_id(self, task_id: str):
        return self.collection.find_one({"_id": ObjectId(task_id)})

    # UPDATE TASK
    def update_task(self, task_id: str, update_data: Dict):
        return self.collection.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": update_data}
        )

    # DELETE TASK
    def delete_task(self, task_id: str):
        return self.collection.delete_one({"_id": ObjectId(task_id)})

    # CONVERT TO JSON
    def to_json(self, task: Dict) -> Dict:
        return {
            "id": str(task["_id"]),
            "title": task["title"],
            "description": task["description"],
            "assigned_to": task.get("assigned_to"),
            "status": task.get("status", "pending")
        }