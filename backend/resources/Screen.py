from flask import jsonify, request
from bson.objectid import ObjectId
from flask_restful import Resource

from . import Db

from .delete_recursively import delete

class Screen(Resource):
    def __init__(self):
        self.screens = Db.mongo.db.screens

    # Will create a blank screen object and return the id
    def post(self):
        screens = self.screens
        screen_id = screens.insert({"options": []})
        return jsonify({"id": str(screen_id)})

class MainScreen(Resource):
    def __init__(self):
        self.screens = Db.mongo.db.screens
    
    def post(self):
        screens = self.screens
        data = request.get_json()
        screen_id = screens.insert({"options": [], "main": True, "title": data["title"]})
        return jsonify({"id": str(screen_id)})
    
    def get(self):
        screens = self.screens
        main_screens = screens.find({"main": True})
        screens = []
        for screen in main_screens:
            screens.append({"id": str(screen["_id"]), "title": screen["title"]})
        return screens

class ScreenSpecific(Resource):
    def __init__(self):
        self.screens = Db.mongo.db.screens
    
    # Will update the values included in the body on a screen object
    def put(self, id):
        screens = self.screens
        data = request.get_json()

        screens.update_one({
            "_id": ObjectId(id)
        },{
            "$set": data
        })

        return self.get(id)

    # Will return a screen object
    def get(self, id):
        screens = self.screens

        screen = screens.find_one({"_id": ObjectId(id)})

        del screen["_id"]

        return jsonify({"output": screen})

    # Recursively deletes a screen
    def delete(self, id):
        screens = self.screens
        
        screen = screens.find_one({"_id": ObjectId(id)})

        delete(screen)

        return jsonify({"success": True})
