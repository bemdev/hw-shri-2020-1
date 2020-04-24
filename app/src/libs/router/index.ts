import { matchPath } from 'react-router-dom';

type RoutesType = { some(route:any): void };
type RoutesPathnameType = string;
type RouteType = { path: string };
type BranchType = { push({}): void[], length: number};

export function matchRoutes(routes:RoutesType, pathname: RoutesPathnameType, branch: BranchType) {
	routes.some((route: RouteType) => {
		const match = route.path ? matchPath(pathname, route) : null;

		match && branch.push({ ...route, params: match.params });
		return match;
	});
	return branch;
}
