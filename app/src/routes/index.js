import { getBuildList, getSettings, getBuildSingle } from '../controllers';

const routes = [
	{
		path: '/',
        title: async () => {
            return {
                data: {
                    repoName: 'School CI Server'
                }
            }
        },
		view: 'index'
	},
	{
		path: '/history',
		title: getSettings,
		view: 'history',
		loadData: getBuildList
    },
    {
		path: '/settings',
		title: async () => {
            return {
                data: {
                    repoName: 'School CI Server'
                }
            }
        },
		view: 'settings',
		loadData: getSettings
    },
    {
        path: '/detail/:buildId',
		title: getSettings,
		view: 'detail',
        loadData: async () => {  return getBuildSingle(window.location.pathname.replace('/detail/','')) }
	}

];

export default routes;
