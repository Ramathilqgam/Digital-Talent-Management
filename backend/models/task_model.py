class TaskModel:
    def __init__(self, mongo):
        self.collection = mongo.db.tasks

    # Create Task
    def create_task(self, task_data):
        return self.collection.insert_one(task_data)

    # Get All Tasks
    def get_tasks(self):
        return list(self.collection.find())

    # Update Task
    def update_task(self, task_id, updated_data):
        return self.collection.update_one(
            {"_id": task_id},
            {"$set": updated_data}
        )

    # Delete Task
    def delete_task(self, task_id):
        return self.collection.delete_one({"_id": task_id})