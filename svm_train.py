import numpy as np
import math
import pandas as pd
from sklearn import svm
from sklearn.externals import joblib
from src.utils.extract import Extract

df = pd.read_excel('dataset/training_set_rel3.xls')
essays, scores = df['essay'], df['domain1_score']

counter = 0
labels = []
data = []

for essay in essays:
    extract = Extract(essay)
    score = scores[counter]
    if math.isinf(score) or math.isnan(score):
        score = 0

    data.append(extract.get_features())
    labels.append(score)

    counter += 1

X = np.array(data)
model = svm.SVC(kernel='linear', C=1.0)
model.fit(X, labels)

joblib.dump(model, 'models/marker_svm.joblib')
