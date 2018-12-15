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

labels = []  # list stores the actual scored values by examiners
data = []   # list stores the extracted features from the essay

counter = 0  # counter for the total essay dataset
for essay in essays[:10]:
    extract = Extract(essay)    # extract the essay features
    score = scores[counter]     # get the examiners score for the essay

    # failsafe if there is no value for the score
    if math.isinf(score) or math.isnan(score):
        score = -9999

    # add the extracted features and the scores to the data and labels respectively
    data.append(extract.get_features())
    labels.append(score)

    counter += 1    # increase the counter

# create a numpy for the extract features and the labels
X = np.array(data)
Y = np.array(labels)

# list for storing model and error pair for Kfold
models = []
model_errors = []

# using svm.SVC algorithm with the linear kernel to train the data
svm_model = svm.SVC(kernel='linear', C=1.0)

kf = KFold(n_splits=5)
for train_index, test_index in kf.split(X):
    # get the training data and the testing data from the indices
    X_train, X_test = X[train_index], X[test_index]
    Y_train, Y_test = Y[train_index], Y[test_index]

    # train the svm.SVC model with the X_train and Y_train
    model = svm_model.fit(X_train, Y_train)

    # list to store the current models predicted score
    predicted_scores = []

    for features in X_test:
        predicted_value = model.predict([features])[0]
        # score actually found in predicted_values
        predicted_scores.append(predicted_value)

    # add the created model and the calculated error metric to the
    # models and the model_errors respectively
    models.append(model)
    model_errors.append(mean_squared_error(Y_test, predicted_scores))

# print(models)

# get the index of the minimum error metric
min_error = min(model_errors)
min_error_index = model_errors.index(min_error)

# print(model_errors)
# print(min_error)
# print(models)
# print(models[min_error_index])

# save the model with minimum error metric to a joblib file
joblib.dump(models[min_error_index], 'models/kFold_svm_model.joblib')
