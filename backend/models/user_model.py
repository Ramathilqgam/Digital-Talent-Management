class UserModel:
    def __init__(self, mongo):
        self.collection = mongo.db.users

    def create_user(self, user_data):
        return self.collection.insert_one(user_data)

    def find_by_email(self, email):
        return self.collection.find_one({"email": email})

    def to_json(self, user):
        return {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user.get("role", "user")
        }
