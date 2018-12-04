import { RouteProps } from 'react-router-dom';
import { SemanticICONS } from 'semantic-ui-react';
import { Overview } from '../Overview';
import { Analysis } from '../Analysis';
import { EssayContent } from '../EssayContent';

interface Route extends RouteProps {
	name: string;
	icon: SemanticICONS;
	desc?: string;
}

export const routes: Array<Route> = [
	{
		exact: true,
		path: '/dashboard/',
		component: Overview,
		name: 'Overview',
		icon: 'home',
		desc: 'List of essays and scores'
	},
	{
		exact: true,
		path: '/dashboard/content',
		component: EssayContent,
		name: 'Essay Writing',
		icon: 'file',
		desc: 'Write your essay and score'
	},
	{
		exact: true,
		path: '/dashboard/analysis',
		component: Analysis,
		name: 'Analysis',
		icon: 'area chart',
		desc: 'Visualize your essay score'
	}
];
