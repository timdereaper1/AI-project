import { RouteProps } from 'react-router-dom';
import { SemanticICONS } from 'semantic-ui-react';
import { Overview } from '../Overview';
import { Analysis } from '../Analysis';
import { EssayContent } from '../EssayContent';
import { Settings } from '../Settings';

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
		desc: 'List of essays and scores'
	},
	{
		exact: true,
		path: '/dashboard/content',
		component: EssayContent,
		name: 'Essay Writing',
		icon: 'file alternate outline',
		desc: 'Write your essay and score'
	},
	{
		exact: true,
		path: '/dashboard/analysis',
		component: Analysis,
		name: 'Analysis',
		icon: 'area chart',
		desc: 'Visualize your essay score'
	},
	{
		exact: true,
		path: '/dashboard/settings',
		component: Settings,
		name: 'Settings',
		icon: 'setting',
		desc: 'Manage your essay profile'
	}
];
