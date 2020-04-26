import { matchPath } from "react-router-dom";

interface Route {
    path: string;
    view: string;
    isExact?: boolean;
    settings?(): void;
    data(): void;
    params?: {};
}

type RoutesEachType = { some?(route: Route): void } | any;
type RoutesPathnameType = string;
type BranchType = { push({}): void[], length: any, settings: [], data: [], view: [] } | any;

export function matchRoutes(routes:RoutesEachType, pathname: RoutesPathnameType, branch: BranchType = []): Route {
    routes.some && routes.some((route: Route) => {
        const match = route.path ? matchPath(pathname, route) : branch.length;
        if (match) {
            branch = { ...route, params: match.params};
        }
    });
    return branch;
}
