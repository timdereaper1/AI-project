import { RouteProps } from 'react-router-dom';
import { Overview } from '../Overview';
import { Analysis } from '../Analysis';
import { EssayContent } from '../EssayContent';

export const routes: Array<RouteProps> = [
	{
		exact: true,
		path: '/dashboard',
		component: Overview
	},
	{
		exact: true,
		path: '/dashboard/content',
		component: EssayContent
	},
	{
		exact: true,
		path: '/dashboard/analysis',
		component: Analysis
	}
];
