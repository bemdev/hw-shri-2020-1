import * as React from 'react';
import cn from '../../libs/names/index';

import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Log from '../Log/Log';
import Loader from '../Loader/Loader';

import './card.css';

export interface CardProps {
    item: Build;
    children?: any;
    view?: string;
}

const Card: React.FC<CardProps> = ({ item, view }) => {
    let types: string = 'warning';

    if (item.status) {
        switch (item.status) {
            case 'Success':
                types = 'done';
                break;
            case 'InProgress':
                types = 'clock';
                break;
            case 'Waiting':
                types = 'clock';
                break;
            case 'Cancel':
                types = 'warning';
                break;
            default:
                break;
        }
    } else {
        item.status = 'Waiting'
    }

    //fix NaN
    if (typeof item.duration !== 'string' && item.duration > 0) {
        if (item.duration < 60000) {
            //if no min get sec
            item.duration = item.duration / 1000 + ' сек';
        } else {
            item.duration = item.duration / 60000 + ' мин';
        }
    }

    const timeOptions = {
        month: 'short',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    return (
        <>
            {view !== 'full' ? (
                <div className={cn('card')({ view: view, border: 'all' })}>
                    <a href={`/detail/${item.id}/log`} className={cn('card', 'content')()}>
                        <div className={cn('card', 'status')({ type: types })}>
                            <Icon fa={types} />
                        </div>
                        <div className={cn('card', 'description')()}>
                            <div className={cn('card', 'text')()}>
                                <div
                                    className={cn(
                                        'card',
                                        'status'
                                    )({
                                        view: 'text',
                                        type: types,
                                    })}
                                >
                                    #{item.buildNumber}
                                </div>
                                <div className={cn('card', 'text')()}>{item.commitMessage}</div>
                            </div>
                            <div className={cn('card', 'subtext')()}>
                                <Icon fa='code-commit' />
                                <Text content={item.branchName} />
                                <Text content={item.commitHash} />
                                <Icon fa='user' />
                                <Text content={item.authorName} />
                            </div>
                        </div>
                        {item.start && (
                            <div className={cn('card', 'info')()}>
                                <div className={cn('card', 'date')()}>
                                    <Icon fa='calendar' />
                                    <Text
                                        size='m'
                                        content={new Date(item.start).toLocaleString(
                                            'ru',
                                            timeOptions
                                        )}
                                    />
                                </div>
                                <div className={cn('card', 'time')()}>
                                    <Icon fa='clock' />
                                    <Text size='m' content={item.duration} />
                                </div>
                            </div>
                        )}
                    </a>
                </div>
            ) : (
                <div className={cn('card')({ view: view, border: 'all' })}>
                    <div className={cn('card', 'content')()}>
                        {item.buildNumber ? (
                            <>
                                <div
                                    className={cn(
                                        'card',
                                        'status'
                                    )({
                                        type: types,
                                    })}
                                >
                                    <Icon fa={types} />
                                </div>
                                <div className={cn('card', 'description')()}>
                                    <div className={cn('card', 'text')()}>
                                        <div
                                            className={cn(
                                                'card',
                                                'status'
                                            )({
                                                view: 'text',
                                                type: types,
                                            })}
                                        >
                                            #{item.buildNumber}
                                        </div>
                                        <div className={cn('card', 'text')()}>
                                            {item.commitMessage}
                                        </div>
                                    </div>
                                    <div className={cn('card', 'subtext')()}>
                                        <Icon fa='code-commit' />
                                        <Text content={item.branchName} />
                                        <a href={`/detail/${item.id}/log`}>{item.commitHash}</a>
                                        <Icon fa='user' />
                                        <Text content={item.authorName} />
                                    </div>
                                    {item.start && (
                                        <div className={cn('card', 'info')()}>
                                            <div className={cn('card', 'date')()}>
                                                <Icon fa='calendar' />
                                                <Text
                                                    size='m'
                                                    content={new Date(item.start).toLocaleString(
                                                        'ru',
                                                        timeOptions
                                                    )}
                                                />
                                            </div>
                                            <div className={cn('card', 'time')()}>
                                                <Icon fa='clock' />
                                                <Text size='m' content={item.duration} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            )}
            {item.log && <Log text={item.log} />}
        </>
    );
};

export default Card;