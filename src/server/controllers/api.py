import os
from flask import jsonify, request
from flask_restful import Resource
from sklearn.externals import joblib
from sklearn.linear_model import LinearRegression
from src.server.utils.extract import Extract

# load the trained model
dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, '../../../models/kFold_svm_model.joblib')
marker = joblib.load(filename)


class EssayGrader(Resource):
    def post(self):
        # get the essay from the post request
        essay_data = request.get_json()
        # extract the features from the essay then mark the essay
        features = Extract(essay_data['essay'])
        score = marker.predict([features.get_features()])[0]
        # the method marks the essay and returns the results as a json
        return jsonify({'score': score, 'values': features.get_raw_extract_values()})
