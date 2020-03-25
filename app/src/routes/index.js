import { getBuildList, getSettings } from '../controllers';

const routes = [
	{
		path: '/',
		view: 'index'
	},
	{
		path: '/history',
		title: getSettings,
		view: 'history',
		loadData: getBuildList
	}
];

export default routes;
