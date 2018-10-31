import pandas as pd
from extract import Extract

df = pd.read_excel('dataset/training_set_rel3.xls')
sets, essays, scores = df['essay_set'], df['essay'], df['domain1_score']

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
    features = Extract(essay).get_features()

    # add the features to the training data
    train.append(len(features))

    # raters resolved score value for the current essay used to supervise the learning
    labels.append(scores[index])

    print(train)
    print(labels)

    if index == 10:
        break

    index += 1
