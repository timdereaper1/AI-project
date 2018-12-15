import numpy as np
import math
import pandas as pd
from sklearn import svm
from sklearn.externals import joblib
from sklearn.model_selection import KFold
from sklearn.metrics import mean_squared_error
from src.server.utils.extract import Extract

df = pd.read_excel('dataset/training_set_rel3.xls')
essays, scores = df['essay'], df['domain1_score']

counter = 0
labels = []
data = []

for essay in essays:
    extract = Extract(essay)
    score = scores[counter]
    if math.isinf(score) or math.isnan(score):
        score = -9999

    data.append(extract.get_features())
    labels.append(score)

    counter += 1

# list for storing model and error pair for Kfold
models = []
model_errors = []

# list of predicted scores from train_index in Kfold
predicted_scores = []

svm_model = svm.SVC(kernel='linear', C=1.0)

kf = KFold(n_splits=5)
for train_index, test_index in kf.split(data):

    X = np.array(data[train_index])

    # train the model with the X and Y data by fitting the data into the model using the
    # fit method provided by the LinearRegression class
    model = svm_model.fit(X, labels[train_index])

    for features in data[test_index]:
        predicted_values = model.predict([features])[0]
        # score actually found in predicted_values
        predicted_scores.append(predicted_values)

    models.append(model)
    model_errors.append(mean_squared_error(scores, predicted_scores))

min_error = min(model_errors)
min_error_index = model_errors.index(min_error)

print(model_errors)
print(min_error)
print(models)
print(models[min_error_index])

# joblib.dump(model, 'models/marker_svm.joblib')
