interface Route {
    route: string;
    view: string;
    isExact?: true;
    settings?(): void;
    data?(): {};
}

type RoutesEachType = { some?(route: Route): void } | any;
type RoutesPathnameType = string;
type BranchType = { push({}): void[], length: any, settings: [], data: [], view: [] } | any;

export function matchRoutes(routes:RoutesEachType, pathname: RoutesPathnameType, branch: BranchType = []): BranchType {
    routes.some && routes.some((route: Route) => {
        if (pathname === route.route) {
            branch.push({ ...route });
        }
    });
    return branch[0];
}
