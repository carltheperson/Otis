from flask import jsonify, request
from bson.objectid import ObjectId
from flask_restful import Resource

from .resources import Db

from .resources import parser

from .resources import shell_script

class Export(Resource):
    def __init__(self):
        self.adventures = Db.mongo.db.adventures

    def get(self, file, id):
        adventures = self.adventures

        adv = adventures.find_one({"_id": ObjectId(id)})

        source = adv["source"]

        parsed_source = parser.parse(source)

        converted_source = ""

        if file == "shell_script":
            converted_source = shell_script.convert(parsed_source)
        
        return {"exported_output": converted_source}