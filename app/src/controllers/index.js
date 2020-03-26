export const getBuildList = async () => {
    const fd = await fetch('http://localhost:3010/api/builds/list?limit=25');
    const fdJson = await fd.json();
    return fdJson;
};

export const getSettings = () => {
	return fetch('http://localhost:3010/api/settings').then(res => res.json());
};

export const getBuildSingle = (buildId) => {
    return fetch('http://localhost:3010/api/builds/{buildId}?buildId=' + buildId)
        .then(res => {
            return res.json();
        });
};
