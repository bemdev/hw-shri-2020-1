import {
    getBuildList,
    getSettings,
    getBuildSingleWithLog,
} from '../controllers';

const routes = [
    {
        route: '/',
        view: 'index',
        isExact: true,
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
        route: '/settings',
        view: 'settings',
        settings: getSettings,
        data: [],
    },
    {
        route: '/history',
        view: 'history',
        settings: getSettings,
        data: getBuildList,
    },
    {
        route: '/detail/:buildId/log',
        view: 'detail-log',
        settings: getSettings,
        data: ({ buildId }: { buildId: Build }) => {
            return getBuildSingleWithLog(buildId);
        },
    },
];

export default routes;
