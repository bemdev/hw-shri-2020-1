import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Menu from '../../Menu/Menu';
import Copyright from '../../Copyright/Copyright';
import SwitchLang from '../../SwitchLang/SwitchLang';

import './footer__content.css';

const Content = () => {
    const { t } = useTranslation();

    return (
        <div className="footer__content">
            <div style={{ display: 'flex' }}>
                <Menu
                    items={[
                        { href: '#', title: t('supportLink') },
                        { href: '#', title: t('learningLink') },
                    ]}
                />
                <SwitchLang lang="en" text={t('switchLang')} />
            </div>
            <Copyright />
        </div>
    );
};

export default Content;
