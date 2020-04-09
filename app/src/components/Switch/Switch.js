import React from 'react';
import Page from '../Page/Page.js';
import { matchRoutes } from '../../libs/router';

const Switch = ({ href, config }) => {
	const { view } = matchRoutes(config, href);
	return <Page view={view} />;
};

export default Switch;
