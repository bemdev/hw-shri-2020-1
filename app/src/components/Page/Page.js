import React from 'react';
import { connect } from 'react-redux';
import cn from '../../libs/names/index.js';

import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

import Grid from '../Grid/Grid.js';
import Button from '../Button/Button.js';
import Icon from '../Icon/Icon.js';
import Text from '../Text/Text.js';
import History from '../History/History.js';
import Form from '../Form/Form.js';
import Title from '../Title/Title.js';
import Modal from '../Modal/Modal.js';

import './page.css';

const Theme = cn('theme')({
    gap: 'small',
    space: 'default',
    size: 'default',
    color: 'project-default',
});

const blockName = cn('page')() + ` ${Theme}`;

const Page = ({
    view,
    settings,
    data,
    modalToggle,
    modalClose,
    modal,
    children,
}) => {
    switch (view) {
        case 'index':
            return (
                <div className={blockName}>
                    <Modal active={modal.active} />
                    <Header title={settings}>
                        <Button
                            onClick={() => {
                                modalToggle(
                                    <Form
                                        settings={settings}
                                        modalClose={modalClose}
                                    />,
                                );
                            }}
                            size="l"
                            hasIcon="cogs"
                            text="Settings"
                        />
                    </Header>
                    <section>
                        <Grid cols="12">
                            <Icon fa="configure" big />
                            <Text
                                type="p"
                                size="l"
                                content="Configure repository connection and synchronization settings"
                            />
                            <Button
                                variant="link"
                                href="/settings"
                                width="full"
                                size="xl"
                                view="active"
                                text="Open settings"
                            />
                        </Grid>
                    </section>
                    <Footer />
                </div>
            );
        case 'history':
            return (
                <div className={blockName}>
                    <Modal active={modal && modal.active} />
                    <Header title={settings} color="default">
                        <Button
                            onClick={() => {
                                modalToggle(
                                    <Form
                                        settings={settings}
                                        type="build"
                                        modalClose={modalClose}
                                    />,
                                );
                            }}
                            size="l"
                            hasIcon="play"
                            text="Run build"
                        />
                        <Button
                            onClick={() => {
                                modalToggle(
                                    <Form
                                        settings={settings}
                                        modalClose={modalClose}
                                    />,
                                );
                            }}
                            size="l"
                            hasIcon="cogs"
                        />
                    </Header>
                    <section>
                        <div className="layout">
                            <History items={data} />
                        </div>
                    </section>
                    <Footer />
                </div>
            );
        case 'settings':
            return (
                <div className={blockName}>
                    <Header title={settings} />
                    <section>
                        <div className="layout">
                            <Title
                                text="Settings"
                                subtitle="Configure repository connection and synchronization settings"
                            />
                            <Form settings={settings} />
                        </div>
                    </section>
                    <Footer />
                </div>
            );
        case 'detail-log':
            return (
                <div className={blockName}>
                    <Modal active={modal && modal.active} />
                    <Header title={settings} color="default">
                        <Button
                            onClick={() => {
                                modalToggle(
                                    <Form
                                        settings={settings}
                                        type="rebuild"
                                        modalClose={modalClose}
                                        items={data}
                                    />,
                                );
                            }}
                            size="l"
                            hasIcon="rebuild"
                            text="Rebuild"
                        />
                        <Button
                            onClick={() => {
                                modalToggle(
                                    <Form
                                        settings={settings}
                                        modalClose={modalClose}
                                    />,
                                );
                            }}
                            size="l"
                            hasIcon="cogs"
                        />
                    </Header>
                    <section>
                        <div className="layout">
                            <History view="detail" items={data} />
                        </div>
                    </section>
                    <Footer />
                </div>
            );
        default:
            return (
                <div className={blockName}>
                    <Header />
                    {children}
                    <Footer />
                </div>
            );
    }
};

const mapStateToProps = state => {
    return {
        modal: state.modal,
        data: state.data,
        settings: state.settings,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        modalToggle: component =>
            dispatch({
                type: 'MODAL_TOGGLE',
                payload: {
                    active: true,
                    content: component,
                },
            }),
        modalClose: component =>
            dispatch({
                type: 'MODAL_TOGGLE',
                payload: {
                    active: false,
                    content: null,
                },
            }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Page);
