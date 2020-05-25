from flask import jsonify, request
from bson.objectid import ObjectId
from flask_restful import Resource

from . import Db

def delete(screen):
    screens = Db.mongo.db.screens

    options_array = screen["options"]

    options_array = screen["options"]
    for option_refrence in options_array:
        option_screen = screens.find_one({"_id": ObjectId(option_refrence["screen_id"])})
        delete(option_screen)

    # Deleting the screen from the database
    screens.delete_one({"_id": screen["_id"]})