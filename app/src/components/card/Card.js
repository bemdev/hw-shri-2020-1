import * as React from 'react';
import cn from '../../libs/names/index.js';

import AppIcon from '../AppIcon/AppIcon';
import Text from '../text/Text';

import './card.css';

const Card = ({ item, children }) => {
	let types;

	switch (item.status) {
		case 'Success':
			types = 'done';
			break;
		case 'InProgress':
			types = 'clock';
			break;
		case 'Cancel':
			types = 'warning';
			break;
		default:
			break;
	}

	return (
		<div className={cn('card')({ border: 'all' })}>
			<div className={cn('card', 'content')()}>
				<div className={cn('card', 'status')({ type: types })}>
					<AppIcon fa={types} />
				</div>
				<div className={cn('card', 'description')()}>
					<div className={cn('card', 'text')()}>
						<div
							className={cn('card', 'status')({ view: 'text', type: types })}
						>
							#{item.buildNumber}
						</div>
						<div className={cn('card', 'text')()}>{item.commitMessage}</div>
					</div>
					<div className={cn('card', 'subtext')()}>
						<AppIcon fa='code-commit' />
						<Text content={item.branchName} />
						<a href='/'>{item.commitHash}</a>
						<AppIcon fa='user' />
						<Text content={item.authorName} />
					</div>
				</div>
				<div className={cn('card', 'info')()}>
					<div className={cn('card', 'date')()}>
						<AppIcon fa='calendar' />
						<Text content={new Date(item.start).toLocaleDateString()} />
					</div>
					<div className={cn('card', 'time')()}>
						<AppIcon fa='clock' />
						<Text content={item.duration} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
