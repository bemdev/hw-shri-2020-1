import React, { useState } from 'react';
import cn from '../../libs/names/index.js';
import { saveSettings, buildRequest } from '../../controllers/';

import './form.css';

import Button from '../AppButton/AppButton.js';
import Text from '../text/Text.js';
import Input from '../input/Input.js';

import './form.css';

const Form = ({ items, type, settings, modalClose }) => {
    const [values, setValues] = useState({
        commitHash: '',
        repoName: '',
        buildCommand: '',
        mainBranch: '',
        period: '',
    });

    const [disabled, setDisabled] = useState(false);

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    const doStart = e => {
        Promise.resolve(settings).then(({ data }) => {
            buildRequest(data, values.commitHash).then(res => modalClose());
        });
    };

    const setSettings = e => {
        setDisabled(true);
        saveSettings({ ...values })
            .then(result => setDisabled(false))
            .catch(err => console.log(err));
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
                        has={'close'}
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
                        has={'close'}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="master"
                        name="mainBranch"
                        value={values.mainBranch}
                        label="Main branch"
                        width="full"
                        has={'close'}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder={10}
                        onChange={handleChange}
                        name="period"
                        value={values.period}
                        with={'add-ons'}
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
