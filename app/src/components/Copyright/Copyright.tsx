import * as React from 'react';
import { useTranslation } from 'react-i18next';

const Copyright = () => {
    const { t } = useTranslation();

    return <div className="Copyright">@ 2020 {t('authorName')}</div>;
};

export default Copyright;
