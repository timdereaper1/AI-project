from flask import jsonify
from flask_restful import Resource


class EssayGrader(Resource):
    def post(self):
        # the method marks the essay and returns the results as a json
        return jsonify({'score': 'essay score'})
