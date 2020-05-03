from flask import jsonify, request
from bson.objectid import ObjectId
from flask_restful import Resource

from . import Db

def delete_screen(screen):
    screens = Db.mongo.db.screens
    options = Db.mongo.db.options


    # Calling delete_option() on all options in the options array
    options_array = screen["options"]
    for option_id in options_array:
        option = options.find_one({"_id": ObjectId(option_id)})
        delete_option(option)

    # Deleting the screen from the database
    screens.delete_one({"_id": screen["_id"]})

def delete_option(option):
    screens = Db.mongo.db.screens
    options = Db.mongo.db.options

    # Calling delete_screen() on the screen that the option is pointing to
    screen = screens.find_one({"_id": ObjectId(option["screen_id"])})
    delete_screen(screen)

    # Deleting the option from the database
    options.delete_one({"_id": option["_id"]})