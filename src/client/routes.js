import { Home } from './Home';
import { Dashboard } from './Dashboard';

export const routes: Array<{ exact: boolean, path: string, component: any }> = [
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
