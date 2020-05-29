from flask import jsonify, request
from bson.objectid import ObjectId
from flask_restful import Resource

from .resources import Db


class Adventure(Resource):
    def __init__(self):
        self.adventures = Db.mongo.db.adventures

    def post(self):
        adventures = self.adventures
        data = request.get_json()
        
        adventure_id = adventures.insert({"title": data["title"], "source": ""})

        return {"id": str(adventure_id)}
        
    def get(self):
        adventures = self.adventures
        
        all_adventures = adventures.find({})

        adventure_infos = []
        for adv in all_adventures:
            adventure_infos.append({"title": adv["title"], "id": str(adv["_id"])})
        
        return adventure_infos

class AdventureSpecific(Resource):
    def __init__(self):
        self.adventures = Db.mongo.db.adventures

    def get(self, id):
        adventures = self.adventures

        adv = adventures.find_one({"_id": ObjectId(id)})

        del adv["_id"]

        return jsonify(adv)

    def put(self, id):
        adventures = self.adventures
        data = request.get_json()

        adventures.update_one({
            "_id": ObjectId(id)
        },{
            "$set": data
        })

        return self.get(id)

    def delete(self, id):
        adventures = self.adventures

        adventures.delete_one({"_id": ObjectId(id)})

        return jsonify({"success": True})


