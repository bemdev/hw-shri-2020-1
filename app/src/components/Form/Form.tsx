import React, { useState } from 'react';
import cn from '../../libs/names/index';
import { saveSettings, buildRequest } from '../../controllers';

import { useTranslation } from 'react-i18next';

import './form.css';

import Button from '../Button/Button';
import Text from '../Text/Text';
import Input from '../Input/Input';

export interface FormProps {
    items?: Build;
    type?: string;
    settings: Settings;
    modalClose(): void;
}

import './form.css';

const Form: React.FC<FormProps> = ({ items, type, settings, modalClose }) => {
    const { t } = useTranslation();

    const initValues = {
        commitHash: '',
        repoName: '',
        buildCommand: '',
        mainBranch: '',
        period: '',
    };

    const [values, setValues] = useState(initValues);

    const [disabled, setDisabled] = useState(false);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    };

    const clear = (ref: RefObject<HTMLInputElement>) => {
        ref.current && setValues({ ...values, [ref.current.name]: '' });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const doStart = () => {
        buildRequest(settings, values.commitHash).then(() => modalClose());
    };

    const doStartRebuild = () => {
        if (items) {
            buildRequest(settings, items.commitHash).then(() => modalClose());
        }
    };

    const setSettings = () => {
        setDisabled(true);
        saveSettings({ ...values })
            .then(() => {
                setDisabled(false);
                window.location.href = '/history';
            })
            .catch((err: {}) => console.log(err));
    };

    switch (type) {
        case 'build':
            return (
                <form
                    onSubmit={handleSubmit}
                    className={cn('form')({ type: type })}>
                    <Text size="xxl" content={t('newBuild')} />
                    <Input
                        placeholder={t('commitHashLabel')}
                        value={values.commitHash}
                        label={t('commitHash')}
                        name="commitHash"
                        width="full"
                        required={true}
                        onChange={handleChange}
                        has={clear}
                    />
                    <Button
                        onClick={doStart}
                        disabled={disabled}
                        size="xl"
                        view="active"
                        text={t('runBuild')}
                    />
                    <Button
                        onClick={modalClose}
                        disabled={disabled}
                        size="xl"
                        text={t('cancel')}
                    />
                </form>
            );

        case 'rebuild':
            return (
                <form
                    onSubmit={handleSubmit}
                    className={cn('form')({ type: type })}>
                    <Text size="xxl" content={t('reBuildText')} />
                    <Button
                        onClick={doStartRebuild}
                        disabled={disabled}
                        size="xl"
                        view="active"
                        text={t('reBuild')}
                    />
                    <Button
                        onClick={modalClose}
                        disabled={disabled}
                        size="xl"
                        text={t('cancel')}
                    />
                </form>
            );

        default:
            return (
                <form onSubmit={handleSubmit} className={cn('form')()}>
                    <Input
                        placeholder="bemdev/ci-server"
                        label={t('gitHubRepo')}
                        value={values.repoName}
                        name="repoName"
                        width="full"
                        required={true}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="yarn dev"
                        value={values.buildCommand}
                        label={t('buildCommand')}
                        name="buildCommand"
                        width="full"
                        has={clear}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="master"
                        name="mainBranch"
                        value={values.mainBranch}
                        label={t('mainBranch')}
                        width="full"
                        has={clear}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder={'10'}
                        onChange={handleChange}
                        name="period"
                        value={values.period}
                        addons={true}
                    />
                    <Button
                        onClick={setSettings}
                        type="submit"
                        disabled={disabled}
                        size="xl"
                        view="active"
                        text={t('saveSettingsButton')}
                    />
                    <Button
                        onClick={() => {}}
                        disabled={disabled}
                        size="xl"
                        text={t('cancelSettingsButton')}
                    />
                </form>
            );
    }
};

export default Form;