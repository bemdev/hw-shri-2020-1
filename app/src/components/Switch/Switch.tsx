import React from 'react';
import Page from '../Page/Page';
import { matchRoutes } from '../../libs/router';

export interface SwitchProps {
    href: string;
    config: {};
}

const Switch: React.FC<SwitchProps> = ({ href, config }) => {
    const { view } = matchRoutes(config, href);
    return <Page view={view} />;
};

export default Switch;
