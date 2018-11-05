import pandas as pd
import pickle
from sklearn.linear_model import LinearRegression
from utils.extract import Extract, standard
# from extract import Extract, standard

# load the validation set from the dataset valic_set.xls file using
# pandas
df = pd.read_excel('dataset/valid_set.xls')

# the essay set to be used to validate the essay
essays = df['essay']

# initialize a new linear regression model
model = LinearRegression()

# load the trained model from the pickle file and initialize
# the model variable with the loaded model from the file
with open('model.pickle', 'rb') as f:
    model = pickle.load(f)

# an index counter to count the total number of essays whose scores
# have been predicted
index = 0

# validate the model with the validation set of essays
for essay in essays:
    # extract the features needed by the model from the essay
    features = Extract(essay, standard).get_features()

    # predict score of the essay
    score = model.predict([features])
    print(score)

    # predict the score of the first 11 essays
    if index == 10:
        break

    index += 1
