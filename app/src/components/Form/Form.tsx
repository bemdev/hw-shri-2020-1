import React, { useState } from 'react';
import cn from '../../libs/names/index';
import { saveSettings, buildRequest } from '../../controllers';

import './form.css';

import Button from '../Button/Button';
import Text from '../Text/Text';
import Input from '../Input/Input';

export interface FormProps {
    items?: { commitHash: string } | any;
    type?: string;
    settings?: any;
    modalClose?(): void;
}

import './form.css';

const Form: React.FC<FormProps> = ({ items, type, settings, modalClose }) => {

    const initValues = {
        commitHash: '',
        repoName: '',
        buildCommand: '',
        mainBranch: '',
        period: '',
    };

    const [values, setValues] = useState(initValues);

    const [disabled, setDisabled] = useState(false);

    const handleChange = (e:any) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const clear = (ref:any) => {
        setValues({...values, [ref.current.name]: ''});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const doStart = () => {
        buildRequest(settings, values.commitHash).then(() => modalClose && modalClose());
    };

    const doStartRebuild = () => {
        buildRequest(settings, items.commitHash).then(() => modalClose && modalClose());
    };

    const setSettings = () => {
        setDisabled(true);
        saveSettings({ ...values })
            .then((result: any) => {
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
                    <Text size="xxl" content="New Build" />
                    <Input
                        placeholder="Commit hash"
                        value={values.commitHash}
                        label="Enter the commit hash which you want to build."
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
                        text="Run build"
                    />
                    <Button
                        onClick={modalClose}
                        disabled={disabled}
                        size="xl"
                        text="Cancel"
                    />
                </form>
            );

        case 'rebuild':
            return (
                <form
                    onSubmit={handleSubmit}
                    className={cn('form')({ type: type })}>
                    <Text
                        size="xxl"
                        content="Do you really want to run rebuild?"
                    />
                    <Button
                        onClick={doStartRebuild}
                        disabled={disabled}
                        size="xl"
                        view="active"
                        text="Rebuild"
                    />
                    <Button
                        onClick={modalClose}
                        disabled={disabled}
                        size="xl"
                        text="Cancel"
                    />
                </form>
            );

        default:
            return (
                <form onSubmit={handleSubmit} className={cn('form')()}>
                    <Input
                        placeholder="bemdev/ci-server"
                        label="GitHub repository"
                        value={values.repoName}
                        name="repoName"
                        width="full"
                        required={true}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="yarn dev"
                        value={values.buildCommand}
                        label="Build command"
                        name="buildCommand"
                        width="full"
                        has={clear}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="master"
                        name="mainBranch"
                        value={values.mainBranch}
                        label="Main branch"
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
                        text="Save settings"
                    />
                    <Button
                        onClick={() => {}}
                        disabled={disabled}
                        size="xl"
                        text="Cancel settings"
                    />
                </form>
            );
    }
};

export default Form;