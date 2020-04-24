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
        path: '/settings',
        view: 'settings',
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
        path: '/detail/:buildId/log',
        view: 'detail-log',
        settings: getSettings,
        data: ({ buildId }: { buildId: Build }) => {
            return getBuildSingleWithLog(buildId);
        },
    },
];

export default routes;
