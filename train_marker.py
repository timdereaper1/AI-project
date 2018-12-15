import pandas as pd
import numpy as np
import math
from sklearn.linear_model import LinearRegression
# from sklearn.preprocessing import StandardScaler
from sklearn.externals import joblib
from src.utils.extract import Extract
# KFold library
from sklearn.model_selection import KFold
# mean square error library
from sklearn.metrics import mean_squared_error

df = pd.read_excel('dataset/training_set_rel3.xls')
sets, essays, scores = df['essay_set'], df['essay'], df['domain1_score']

max_val = len(essays)

# the labels list holds the scores given by the raters - examiners of the
# essays. which will be used in the linear regression model mapping to
# the extracted features for an essay stored in the train list
labels = []

# the train list holds the numerical values of the extracted features from
# each essay stored as a list of lists i.e. [[1, 2, 6, 7], [9, 0, 2, 4]]
# which is used to train the linear regression model
train = []

# the index is used to get the current index of the essay from the essays
# list
index = 0

# iterating through the essays for each given set. then extracting the
# features need to train the model with and getting the resolved score
# between the raters - examiners of the essays - which is the
# domain1_score column in the xls sheet
for essay in essays:
    # Extract the needed features from the essay
    features = Extract(essay).get_features()

    # add the features to the training data
    train.append(features)

    # raters resolved score value and the essay set for the essay
    score, category = scores[index], sets[index]
    if math.isinf(score) or math.isnan(score):
        labels.append([0, category])
    else:
        labels.append([score, category])

    if index >= max_val:
        break

    index += 1

# normalize the training data with sklearn StandardScaler
# train_normalize = StandardScaler().fit_transform(train)

# list for storing model and error pair for Kfold
models = []
model_errors = []

# list of predicted scores from train_index in Kfold
predicted_scores = []

kf = KFold(n_splits=5)
for train_index, test_index in kf.split(train):

    # train the model with the X and Y data by fitting the data into the model using the
    # fit method provided by the LinearRegression class
    model = LinearRegression().fit(train[train_index], labels[train_index])
    
    for features in train[test_index]:
        predicted_values = model.predict([features])[0]
        # score actually found in predicted_values[0]
        predicted_scores.append(predicted_values[0])
    
    models.append(model)
    model_errors.append(mean_squared_error(scores, predicted_scores))

min_error = min(model_errors)
min_error_index, = model_errors.index(min_error)

print(model_errors)
print(min_error)

# save the trained model in a joblib file for faster loading of the model during
# testing or using it in an application
joblib.dump(models[min_error_index], 'models/marker.joblib')
