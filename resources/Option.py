from flask import jsonify, request
from bson.objectid import ObjectId
from flask_restful import Resource

from . import Db

from .delete_recursively import delete_option

class Option(Resource):
    def __init__(self):
        self.options = Db.mongo.db.options
    
    # Creates an option pointing to the screen id included in the body. Returns the option id
    def post(self):
        options = self.options
        data = request.get_json()

        option_id = options.insert({"screen_id": data["screen_id"]})

        return jsonify({"id": str(option_id)})

class OptionSpecific(Resource):
    def __init__(self):
        self.options = Db.mongo.db.options

    # Returns the title and the id for the screen it points to
    def get(self, id):
        options = self.options

        option = options.find_one({"_id": ObjectId(id)})

        del option["_id"]

        return jsonify({"output": option})

    # Updates the option with the values included in the body
    def put(self, id):
        options = self.options
        data = request.get_json()
        
        options.update_one({
            "_id": ObjectId(id)
        }, {
            "$set": data
        })

        return self.get(id)

    # Recursively deletes the option and any child screens/options
    def delete(self, id):
        options = self.options
        
        option = options.find_one({"_id": ObjectId(id)})
        delete_option(option)

        return jsonify({"success": True})