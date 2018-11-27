import pandas as pd
import numpy as np
import math
from sklearn.linear_model import LinearRegression
# from sklearn.preprocessing import StandardScaler
from sklearn.externals import joblib
from src.utils.extract import Extract

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
    features = Extract(essay).get_features()  # [5,7,9,6,4,2]

    # add the features to the training data
    train.append(features)  # [[5,7,9,6,4,2], [9,8,6,2,3,4]]

    # raters resolved score value and the essay set for the essay
    # labels = [[9, 1], [3,7], [9,2]]
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

# train the model with the X and Y data by fitting the data into the model using the
# fit method provided by the LinearRegression class
model = LinearRegression().fit(train, labels)

# save the trained model in a joblib file for faster loading of the model during
# testing or using it in an application
joblib.dump(model, 'models/marker.joblib')
