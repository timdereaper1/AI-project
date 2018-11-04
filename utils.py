import csv
import os
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import io
from gensim import corpora
from gensim.models import LsiModel
from gensim.models.coherencemodel import CoherenceModel

# setting the english dictionary to filter out the stopwords such as
# off, the, to, etc. from the essays as a set
stop_words = set(stopwords.words('english'))

# list of parts of speech in nltk
POS = ['CC', 'CD', 'DT', 'EX', 'FW', 'IN', 'JJ', 'JJR', 'JJS', 'LS', 'MD', 'NN', 'NNS', 'NNP', 'NNPS', 'PDT', 'POS',
       'PRP', 'PRP$', 'RB', 'RBR', 'RBS', 'RP', 'TO', 'UH', 'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ', 'WDT', 'WP', 'WP$', 'WRB']


def get_key(obj):
    # returns the key of the dictionary
    return list(obj.keys())[0]


def write_csv(filename, matrix, cutoff=2):
    # Write out the matrix to a csv file. Note that setting cutoff=1 means
    # that words which appear in 1 or more documents will be included in
    # the output (i.e. every word will appear in the output). The default
    # for cutoff is 2, since we usually aren't interested in words which
    # appear in a single document. For this example we want to see all
    # words however, hence cutoff=1.
    # create an instance of the csv object to write the file to
    file = csv.writer(open(filename, 'w'))
    # write each row in the matrix to the file
    for row in matrix.rows(cutoff=cutoff):
        file.writerow(row)


def tokenize_text(doc):
    # tokenize the essays into words such as ['this', 'as'] etc
    words = word_tokenize(doc)

    # remove the stopwords from the essay using the english dictionary version
    # since the essays were written in english
    tokenized = [
        word for word in words if word not in stop_words]

    # reconstructing the sentences in the doc
    sentence = ' '.join(tokenized)

    # return the filtered document
    return tokenized, sentence


def write_txt(filename, text):
    # open the file for writing
    file = open(filename + '.txt', 'w')
    # write the text to the file
    file.write(text)
    file.flush()


def get_essay_set(essay_set):
    # create a list of dictionary with the the essay_set having the key to
    # by the id of the essay set and the value being the total number of
    # essays for that set
    setList = [{i: 0} for i in set(essay_set)]

    # iterating through the setIds find the length or the total number of essays
    # for the id and set its value with the number
    for setId in setList:
        # get the key of the setId such as {1: 0} i.e. key = 1
        key = get_key(setId)
        # iterate the essay_set then match the value to the key
        # if both matches add a value of 1 to the value of the setId
        # example [1, 1, 1, 2] => [{1: 3}, {2: 1}]
        for essaySet in essay_set:
            if essaySet == key:
                setId[key] = setId[key] + 1

    return setList


def create_data_dir(sets, essays, dir_name='/data'):
    i = 0
    while i < len(sets):
        directory = str(dir_name) + str(sets[i])
        try:
            os.mkdir(directory)
        except:
            pass
        write_txt(directory + '/' + str(i), essays[i])
        i = i + 1


# the function takes a text tokenized into its words, then tags the
# various words with the appropriate part of speech such as nouns,
# pronouns etc. It gets the count for each POS in the text, the POS
# which are not found in the text are assigned a value of 0 to maintain
# a fixed length for the vocabulary when training the model
def vocab(tokenizedText):
    voc = {}
    for tag in nltk.pos_tag(tokenizedText):
        if tag[1] in POS:
            voc[tag[1]] = voc.get(tag[1], 0) + 1

    # iterate through the POS list, checking which of the POS is not
    # found in the voc and assigning a value of 0 to it
    for tag in POS:
        if tag not in voc:
            voc[tag] = 0

    return voc


def extract_paragraphs(doc):
    """
    Input  : path and file_name
    Purpose: extracting paragraph and topics from text file
    Output : list of paragraphs/documents and
             title(initial 100 words considred as title of document)
    """
    paragraph_set = []

    buf = io.StringIO(doc)
    
    for line in buf.readlines():
        text = line.strip()
        paragraph_set.append(text)

    print("Total Number of paragraphs:",len(paragraph_set))
    return paragraph_set



def preprocess_paragraph(paragraph_set):
    """
    Input  : paragraph list
    Purpose: preprocess text (tokenize, removing stopwords, and stemming)
    Output : preprocessed text
    """

    # list for tokenized documents in loop
    texts = []
    # loop through paragraph list
    for i in paragraph_set:
        # clean and tokenize document string
        raw = i.lower()
        tokens = tokenize_text(raw)
        texts.append(tokens)
        
    return texts


def compute_coherence_value( paragraph_set_clean, stop, start=2, step=3):
    """
    Input   : dictionary : Gensim dictionary
              corpus : Gensim corpus
              texts : List of input texts
              stop : Max num of topics
    purpose : Compute c_v coherence for various number of topics
    Output  : model_list : List of LSA topic models
              coherence_values : Coherence values corresponding to the LDA model with respective number of topics
    """
    coherence_values = []

     # Creating the term dictionary of our courpus, where every unique term is assigned an index.
    dictionary = corpora.Dictionary(paragraph_set_clean)
    # Converting list of documents (corpus) into Document Term Matrix using dictionary prepared above.
    doc_term_matrix = [dictionary.doc2bow(paragraph) for paragraph in paragraph_set_clean]

    for num_of_topics in range(start, stop, step):
        # generate LSA model
        model = LsiModel(doc_term_matrix, num_topics=num_of_topics, id2word = dictionary)  # train model

        coherencemodel = CoherenceModel(model=model, texts=paragraph_set_clean, dictionary=dictionary, coherence='c_v')
        coherence_values.append(coherencemodel.get_coherence())
        
    return max(coherence_values)