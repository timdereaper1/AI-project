import pandas as pd
import numpy as np
import pickle
import math
from sklearn.linear_model import LinearRegression
from src.utils.extract import Extract, standard

df = pd.read_excel('dataset/training_set_rel3.xls')
sets, essays, scores = df['essay_set'], df['essay'], df['domain1_score']

max_val = len(essays)

# Initialize class to create term-document matrix which is used in
# determining the content of the essay
# tdm = textmining.TermDocumentMatrix()

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
    features = Extract(essay, standard).get_features()

    # add the features to the training data
    train.append(features)

    # raters resolved score value for the current essay used to supervise the learning
    score = scores[index]
    if math.isinf(score) or math.isnan(score):
        labels.append(0)
    else:
        labels.append(score)

    if index >= max_val:
        break

    index += 1

# train the model with the X and Y data by fitting the data into the model using the
# fit method provided by the LinearRegression class
model = LinearRegression().fit(train, labels)

# save the trained model in a pickle file for faster loading of the model during
# testing or using it in an application
with open('model.pickle', 'wb') as f:
    pickle.dump(model, f)
