import { Constants as SharedConstants } from '../../_shared/constants';

export const Constants = {
	...SharedConstants,
	filter: {
		POS: ['FW', 'EX', 'LS', 'PDT', 'RP', 'TO', 'WDT', 'WP', 'WP$', 'WRB'],
		RES: ['pos', 'analysis']
	},
	analysis: {
		words: ['total long words', 'total short words', 'total words'],
		senc: ['total sentences', 'words per sentence'],
		para: ['total paragraphs', 'sentence per paragraph']
	},
	overall: {
		misc: [
			'characters per word',
			'sentence per paragraph',
			'total punctuations',
			'words per sentence',
			'total misspelt words'
		],
		scores: ['total words', 'total sentences', 'total paragraphs', 'pos']
	}
};
