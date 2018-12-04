import { RouteProps } from 'react-router-dom';
import { SemanticICONS } from 'semantic-ui-react';
import { Overview } from '../Overview';
import { Analysis } from '../Analysis';
import { EssayContent } from '../EssayContent';

interface Route extends RouteProps {
	name: string;
	icon: SemanticICONS;
	desc?: string;
	info?: string;
}

export const routes: Array<Route> = [
	{
		exact: true,
		path: '/dashboard/',
		component: Overview,
		name: 'Overview',
		icon: 'home',
		desc: 'List of essays and scores',
		info: 'Overiew shows the various essay written by people and the scores for the essay.'
	},
	{
		exact: true,
		path: '/dashboard/content',
		component: EssayContent,
		name: 'Essay Writing',
		icon: 'file',
		desc: 'Write your essay and score',
		info: 'Write your essay for the selected topic or write your own topic.'
	},
	{
		exact: true,
		path: '/dashboard/analysis',
		component: Analysis,
		name: 'Analysis',
		icon: 'area chart',
		desc: 'Visualize your essay score',
		info:
			'Analysis shows you the graphs and charts on the various aspects of the essay use to score your writting.'
	}
];
