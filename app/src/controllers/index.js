export const getBuildList = async () => {
	let data = [];

	try {
		const fd = await fetch('http://localhost:3010/api/builds/list?limit=25');
		const fdJson = await fd.json();
		data.push(fdJson.data);
	} catch (error) {
		console.log(error);
	}

	return data;
};

export const getSettings = () => {
	return fetch('http://localhost:3010/api/settings').then(res => res.json());
};
