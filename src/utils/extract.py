import string
import operator
import functools
import math
from enchant.checker import SpellChecker
from src.utils.functions import tokenize_text, vocab
from src.utils.latent import LatentSemanticAnalysis


# using the UK and the US dictionaries for checking misspelt words
spell_checker = SpellChecker('en_UK', 'en_US')


class Extract():
    # the Extract class is used to extract the various features from the
    # essay
    def __init__(self, doc):
        self.doc = doc

        # filter the essay removing the stopwords which are unnecessay in the
        # training model since they do not provide much significance to the
        # essay. using the tokenize_text util function to generate the tokenized
        # words and the sentences from the essay
        self.tokens, self.text = tokenize_text(self.doc)

        # extracting the word count feature from the essay by counting the total
        # number of words written in the essay
        self.words = len(self.tokens)

        # extracting the sentence count feature from essay that's the total
        # number of sentences written
        self.sentences = self.text.count('.')

        # extracting the character count feature involving the total number of
        # individual letters written in the essay
        self.chars = sum(len(w) for w in self.tokens)

        # using PyEnchant to extract the total number of mispelt words in the essay
        # to determine the orthography or command over the language
        spell_checker.set_text(self.text)
        self.misspelt = len([err.word for err in spell_checker])

        # extract punctuation features by counting the total number of punctuations used
        # in the essay
        self.puncs = len(list(filter(functools.partial(
            operator.contains, string.punctuation), self.text)))

        # extracting the parts of speech from the essay as a proxy for vocabulary
        self.voca = [val for val in vocab(self.tokens).values()]

        # evaluating coherence
        self.coherence = LatentSemanticAnalysis(
            self.doc, stop=12).get_coherence()

    def get_features(self):
        # the method returns the numerical values of the features extracted from the essay
        # in a list
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

    def get_raw_extract_values(self):
        # the method returns the raw extracted values used to mark the essay
        scores = {
            'words': self.words,
            'sentences': self.sentences,
            'characters': self.chars,
            'misspelt_words': self.misspelt,
            'punctuations': self.puncs,
            'pos': vocab(self.tokens),
            'analysis': self.coherence
        }

        return scores
