import io
from gensim import corpora
from gensim.models import LsiModel
from gensim.models.coherencemodel import CoherenceModel
from utils import tokenize_text


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

    return paragraph_set


def preprocess_paragraph(paragraph_set):
    """
    Input  : paragraph list
    Purpose: preprocess text (tokenize, removing stopwords, and stemming)
    Output : preprocessed text
    """

    # clean and tokenize document string
    texts = [tokenize_text(paragraph.lower())[0]
             for paragraph in paragraph_set]

    return texts


def compute_coherence_value(paragraph_set_clean, stop, start=2, step=3):
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
    doc_term_matrix = [dictionary.doc2bow(
        paragraph) for paragraph in paragraph_set_clean]

    for num_of_topics in range(start, stop, step):
        # generate LSA model
        model = LsiModel(doc_term_matrix, num_topics=num_of_topics,
                         id2word=dictionary)  # train model

        coherencemodel = CoherenceModel(
            model=model, texts=paragraph_set_clean, dictionary=dictionary, coherence='c_v')
        coherence_values.append(coherencemodel.get_coherence())

    return max(coherence_values)


class LatentSemanticAnalysis():
    # the LSA abstract class, to generate the LSA feature for training the model
    def __init__(self, doc, stop=12):
        self.doc = doc
        doc_paras = extract_paragraphs(self.doc)
        process_paras = preprocess_paragraph(doc_paras)
        self.coherence = compute_coherence_value(process_paras, stop)

    def get_coherence(self):
        # returns the coherence value for the document
        return self.coherence
