import { getBuildList, getSettings, getBuildSingle } from '../controllers';

const routes = [
	{
		path: '/',
        view: 'index',
		exact: true,
		settings: async () => {
			return {
				data: {
					repoName: 'School CI Server'
				}
			};
		}
	},
	{
		path: '/history',
        view: 'history',
        settings: getSettings,
		data: getBuildList
	},
	{
		path: '/settings',
        view: 'settings',
		settings: async () => {
			return {
				data: {
					repoName: 'School CI Server'
				}
			};
		},
		data: getSettings
	},
	{
		path: '/detail/:buildId',
        view: 'detail',
		settings: getSettings,
		data: ({buildId}) => {
			return getBuildSingle(buildId);
		}
    },
    {
        path: '/detail/:buildId/log',
        view: 'detail-log',
		settings: getSettings,
		data: ({buildId}) => {
			return getBuildSingle(buildId);
		}
    }
];

export default routes;
