from bson import ObjectId
from app import mongo

def create_task(data):
    return mongo.db.tasks.insert_one(data)

def get_tasks():
    tasks = []
    for t in mongo.db.tasks.find():
        tasks.append({
            "_id": str(t["_id"]),
            "title": t["title"],
            "description": t["description"]
        })
    return tasks

def update_task(id, data):
    mongo.db.tasks.update_one({"_id": ObjectId(id)}, {"$set": data})

def delete_task(id):
    mongo.db.tasks.delete_one({"_id": ObjectId(id)})
