import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import cn from '../../libs/names/index';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Grid from '../Grid/Grid';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import History from '../History/History';
import Form from '../Form/Form';
import Title from '../Title/Title';
import Modal from '../Modal/Modal';

import { useTranslation } from 'react-i18next';

import './page.css';

const Theme = cn('theme')({
    gap: 'small',
    space: 'default',
    size: 'default',
    color: 'project-default',
});

export interface PageProps {
    view: string;
    settings: Settings;
    data: Build;
    children?: string;
    modal: { active: boolean };
    modalToggle(component: React.ReactNode): void;
    modalClose(): void;
}

const Page: React.FC<PageProps> = ({
    view,
    settings,
    data,
    modalToggle,
    modalClose,
    modal,
    children,
}) => {
    const blockName = cn('page')({ view: view }) + ` ${Theme}`;
    const { t } = useTranslation();

    switch (view) {
        case 'index':
            return (
                <div className={blockName}>
                    <Modal active={modal.active} />
                    <Header
                        color="default"
                        href="/history"
                        title={{ repoName: t('pageTitle') }}>
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
                            text={t('settings')}
                        />
                    </Header>
                    <section>
                        <Grid cols="12">
                            <Icon fa="configure" big />
                            <Text
                                type="p"
                                size="l"
                                content={t('previewText')}
                            />
                            <Button
                                variant="link"
                                href="/settings"
                                width="full"
                                size="xl"
                                view="active"
                                text={t('openSettingsButton')}
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
                    <Header href="/history" title={settings} color="default">
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
                            text={t('runBuild')}
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
                    <Header
                        href="/"
                        title={{ repoName: t('pageTitle') }}
                        color="default"
                    />
                    <section>
                        <div className="layout">
                            <Title
                                text={t('settings')}
                                subtitle={t('previewText')}
                            />
                            <Form
                                settings={settings}
                                modalClose={() => false} //if we no have modal this fix modalClose?: type
                            />
                        </div>
                    </section>
                    <Footer />
                </div>
            );
        case 'detail-log':
            return (
                <div className={blockName}>
                    <Modal active={modal && modal.active} />
                    <Header href="/history" title={settings} color="default">
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
                            text={t('reBuild')}
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
                    <Header href="/" title={settings} color="default" />
                    {children}
                    <Footer />
                </div>
            );
    }
};

const mapStateToProps = (state: any) => {
    return {
        modal: state.modal,
        data: state.data,
        settings: state.settings,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        modalToggle: (component: React.Component) =>
            dispatch({
                type: 'MODAL_TOGGLE',
                payload: {
                    active: true,
                    content: component,
                },
            }),
        modalClose: () =>
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
