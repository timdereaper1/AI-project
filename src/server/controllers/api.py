from flask import jsonify, Request
from flask_restful import Resource


class EssayGrader(Resource):
    def post(self):
        # get the essay from the post request
        # the method marks the essay and returns the results as a json
        return jsonify({'score': 'essay score'})
