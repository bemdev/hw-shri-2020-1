import {
	getBuildList,
	getSettings,
	getBuildSingleWithLog,
} from '../controllers';

const routes = [
	{
		path: '/',
		view: 'index',
		exact: true,
		settings: async () => {
			return {
				data: {
					repoName: 'School CI Server',
				},
			};
		},
		data: [],
	},
	{
		path: '/history',
		view: 'history',
		settings: getSettings,
		data: getBuildList,
	},
	{
		path: '/settings',
		view: 'settings',
		settings: async () => {
			return {
				data: {
					repoName: 'School CI Server',
				},
			};
		},
		data: getSettings,
	},
	{
		path: '/detail/:buildId/log',
		view: 'detail-log',
		settings: getSettings,
		data: ({ buildId }) => {
			return getBuildSingleWithLog(buildId);
		},
	},
];

export default routes;
