import os
import enchant
import pandas as pd
import textmining
from nltk import pos_tag
from enchant.checker import SpellChecker
from utils import tokenize_text

df = pd.read_excel('dataset/training_set_rel3.xls')
sets, essays, scores = df['essay_set'], df['essay'], df['domain1_score']

# Initialize class to create term-document matrix which is used in
# determining the content of the essay
tdm = textmining.TermDocumentMatrix()

# using the UK and the US dictionaries for checking misspelt words
spell_checker = SpellChecker('en_UK', 'en_US')

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

    # filter the essay removing the stopwords which are unnecessay in the
    # training model since they do not provide much significance to the
    # essay. using the tokenize_text util function to generate the tokenized
    # words and the sentences from the essay
    tokens, sents = tokenize_text(essay)

    # extracting the word count feature from the essay by counting the total
    # number of words written in the essay
    word_count = len(tokens)

    # extracting the sentence count feature from essay that's the total
    # number of sentences written
    sentence_count = sents.count('.')

    # extracting the character count feature involving the total number of
    # individual letters written in the essay
    character_count = sum(len(word) for word in tokens)

    # extracting the parts of speech from the essay as a proxy for vocabulary
    vocabulary = {}
    for tags in pos_tag(tokens):
        vocabulary[tags[1]] = vocabulary.get(tags[1], 0) + 1

    # using PyEnchant to extract the total number of mispelt words in the essay
    # to determine the orthography or command over the language
    spell_checker.set_text(sents)
    misspelt_words = len([err.word for err in spell_checker])

    # TODO: extract punctuation features using various RegExp

    # extract the bag of words from the essay
    tdm.add_doc(sents)

    # a list of the numerical values of the extracted features from the essay
    # to be used to train the model. adding the vocabulary to the list
    features = list(vocabulary.values())

    # adding total word count for the essay
    features.append(word_count)
    # add total sentence count for the essay
    features.append(sentence_count)
    # adding character count from the essay
    features.append(character_count)
    # adding the total number of misspelt words
    features.append(misspelt_words)

    # store the numerical values in the train list as a list
    train.append(features)

    # store the raters resolved score value for the current essay in the labels list
    # by using the index variable
    labels.append(scores[index])

    print(train)
    print(labels)
    index += 1
    break
