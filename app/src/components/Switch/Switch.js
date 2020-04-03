import React from 'react';
import { matchPath } from 'react-router-dom';
import Page from '../Page/Page.js';

function matchRoutes(routes, pathname, branch = []) {
	routes.some((route) => {
		const match = route.path ? matchPath(pathname, route) : branch.length;

		match && branch.push({ ...route, params: match.params });
		return match;
	});
	return branch[0];
}

const Switch = ({ href, config }) => {
	const { view, settings, data, params } = matchRoutes(config, href);
	return <Page view={view} settings={settings()} data={data && data(params)} />;
};

export default Switch;
