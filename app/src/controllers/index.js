import axios from 'axios';

const fetch = () => {};

export const getBuildList = () => {
	return axios
		.get('http://localhost:3000/api/builds/list?limit=25')
		.then((response) => response.data);
};

export const getSettings = () => {
	return axios
		.get('http://localhost:3000/api/settings')
		.then((response) => response.data);
};

export const saveSettings = (settings) => {
	const { repoName, mainBranch, buildCommand, period } = settings;
	return fetch('http://localhost:3000/api/settings', {
		mode: 'cors',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			repoName: repoName,
			mainBranch: mainBranch,
			buildCommand: buildCommand,
			period: Number(period),
		}),
	}).then((res) => 'ok');
};

export const getBuildSingleWithLog = async (buildId) => {
	const build = await axios
		.get('http://localhost:3000/api/builds/{buildId}?buildId=' + buildId)
		.then((response) => response.data);

	build.data.log = await getBuildLog(buildId);
	return build;
};

export const getBuildLog = (buildId) => {
	return axios
		.get('http://localhost:3000/api/builds/{buildId}/logs?buildId=' + buildId)
		.then((response) => response.data);
};

export const buildRequest = (buildParams, hash) => {
	return new Promise((resolve) => {
		const { commits, mainBranch } = buildParams;
		return commits.some((commit) => {
			if (commit[0] === hash) {
				fetch('http://localhost:3000/api/build/request', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					body: JSON.stringify({
						commitMessage: commit[3],
						commitHash: commit[0],
						branchName: mainBranch,
						authorName: commit[1],
					}),
				}).then((res) => resolve(res));
			}
			return false;
		});
	});
};
