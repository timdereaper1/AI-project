import pandas as pd
# import os
import textmining
from utils import create_data_dir

df = pd.read_excel('dataset/training_set_rel3.xls')
sets, essays = df['essay_set'], df['essay']

create_data_dir(sets, essays)

# Initialize class to create term-document matrix
# tdm = textmining.TermDocumentMatrix()


# taking one of the data files the using it as a guinea pig to extract
# relevant features from the text
# essay = open('test.txt', 'r').read()

# looping through each essay in the essay column of the dataset
# for essay in df['essay']:
#     # filter the essay to access relevant text for features
#     filteredEssay = filter_document(essay)

#     # change the filteredEssay list to string for textmining in built tokenizer
#     text = ' '.join(filteredEssay)

#     # Add the documents
#     tdm.add_doc(text)

# # write matrix to csv file
# write_csv('analysis/document_matrix.csv', tdm, cutoff=2)
