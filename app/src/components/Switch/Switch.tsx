import React from 'react';
// import Page from '../Page/Page.js';
import { matchRoutes } from '../../libs/router';

export interface SwitchProps {
	href: string;
	config: {}
}

const Switch: React.FC<SwitchProps> = ({ href, config }) => {
	const { view } = matchRoutes(config, href, []);
	return <div>Page {view}</div>//<Page view={view} />;
};

export default Switch;
