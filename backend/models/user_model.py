class TaskModel:
    def __init__(self, mongo):
        self.collection = mongo.db.tasks

    def create_task(self, task_data):
        return self.collection.insert_one(task_data)

    def get_tasks(self):
        return list(self.collection.find())

    def update_task(self, task_id, updated_data):
        return self.collection.update_one(
            {"_id": task_id},
            {"$set": updated_data}
        )

    def delete_task(self, task_id):
        return self.collection.delete_one({"_id": task_id})