class UserModel:
    def __init__(self, mongo):
        self.collection = mongo.db.users

    def find_by_email(self, email):
        return self.collection.find_one({"email": email})

    def create_user(self, user_data):
        return self.collection.insert_one(user_data)