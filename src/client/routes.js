import { RouteProps } from 'react-router-dom';
import { Home } from './Home';
import { Dashboard } from './Dashboard';

export const routes: Array<RouteProps> = [
	{
		exact: true,
		path: '/',
		component: Home
	},
	{
		exact: false,
		path: '/dashboard',
		component: Dashboard
	}
];
