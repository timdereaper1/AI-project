import { Component, FunctionComponent } from 'react';
import { Analysis } from './Analysis';
import { Home } from './Home';
import { EssayContent } from './EssayContent';

interface Route {
	exact?: boolean;
	path: string;
	component: Component | FunctionComponent;
}

export const routes: Array<Route> = [
	{
		exact: true,
		path: '/',
		component: Home
	},
	{
		exact: true,
		path: '/analysis',
		component: Analysis
	},
	{
		exact: true,
		path: '/content',
		component: EssayContent
	}
];
