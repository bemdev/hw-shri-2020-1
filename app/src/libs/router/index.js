import { matchPath } from 'react-router-dom';

export function matchRoutes(routes, pathname, branch = []) {
	routes.some((route) => {
		const match = route.path ? matchPath(pathname, route) : branch.length;

		match && branch.push({ ...route, params: match.params });
		return match;
	});
	return branch[0];
}
