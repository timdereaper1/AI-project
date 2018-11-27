import pandas as pd
from sklearn.externals import joblib
from src.utils.extract import Extract

# load the validation set from the dataset valic_set.xls file using
# pandas
df = pd.read_excel('dataset/training_set_rel3.xls')

# the essay set to be used to validate the essay
essays, scores = df['essay'], df['domain1_score']

# load the marker model
model = joblib.load('models/marker_svm.joblib')

# an index counter to count the total number of essays whose scores
# have been predicted
index = 0

done = 0

# validate the model with the validation set of essays
for essay in essays[:10]:
    # extract the features needed by the model from the essay
    features = Extract(essay)

    # predict score of the essay
    score = model.predict([features.get_features()])[0]
    if score == scores[index]:
        done += 1

    index += 1

accuracy = done / 10 * 100
print(accuracy)
