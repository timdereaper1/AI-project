import string
import operator
import functools
import math
from enchant.checker import SpellChecker
from utils import tokenize_text, vocab
from latent import LatentSemanticAnalysis


# using the UK and the US dictionaries for checking misspelt words
spell_checker = SpellChecker('en_UK', 'en_US')

# dictionary of standard values used to train the model
standard = {
    'words': 300,
    'sentences': 100,
    'chars': 1000,
    'wrongs': 10,
    'puncs': 30,
    'voca': 100
}


class Extract():
    # the Extract class is used to extract the various features from the
    # essay
    def __init__(self, doc, standard):
        self.doc = doc

        # filter the essay removing the stopwords which are unnecessay in the
        # training model since they do not provide much significance to the
        # essay. using the tokenize_text util function to generate the tokenized
        # words and the sentences from the essay
        self.tokens, self.text = tokenize_text(self.doc)

        # extracting the word count feature from the essay by counting the total
        # number of words written in the essay
        self.words = len(self.tokens) / standard['words']

        # extracting the sentence count feature from essay that's the total
        # number of sentences written
        self.sentences = self.text.count('.') / standard['sentences']

        # extracting the character count feature involving the total number of
        # individual letters written in the essay
        self.chars = sum(len(w) for w in self.tokens) / standard['chars']

        # using PyEnchant to extract the total number of mispelt words in the essay
        # to determine the orthography or command over the language
        spell_checker.set_text(self.text)
        self.misspelt = len(
            [err.word for err in spell_checker]) / standard['wrongs']

        # extract punctuation features by counting the total number of punctuations used
        # in the essay
        self.puncs = len(list(filter(functools.partial(
            operator.contains, string.punctuation), self.text))) / standard['puncs']

        # extracting the parts of speech from the essay as a proxy for vocabulary
        self.voca = [val / standard['voca']
                     for val in vocab(self.tokens).values()]

        # evaluating coherence
        self.coherence = LatentSemanticAnalysis(
            self.doc, stop=12).get_coherence()

    # the method returns the numerical values of the features extracted from the essay
    # in a list

    def get_features(self):
        features = self.voca
        features.append(self.words)
        features.append(self.sentences)
        features.append(self.chars)
        features.append(self.misspelt)
        features.append(self.puncs)
        features.append(self.coherence)

        index = 0
        for val in features:
            if math.isnan(val) or math.isinf(val):
                features[index] = 0

            index += 1
        return features
