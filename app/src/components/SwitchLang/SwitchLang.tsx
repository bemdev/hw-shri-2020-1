import React, { useEffect, useState } from 'react';
import i18next from 'i18next';

export interface ISwitchLangProps {
    text: string;
    lang: string;
}

const SwitchLang: React.FC<ISwitchLangProps> = ({ text, lang }) => {
    const handleClick = () => {
        if (i18next.language === 'ru') {
            i18next.changeLanguage('en');
        } else {
            i18next.changeLanguage('ru');
        }
    };

    return (
        <a
            className="menu__item Link"
            onClick={() => {
                handleClick();
            }}
            href="#">
            {text}
        </a>
    );
};

export default SwitchLang;
