import * as React from 'react';
import cn from '../../libs/names/index.js';

import AppIcon from '../Icon/Icon';
import Text from '../Text/Text';
import Log from '../Log/Log.js';
import Loader from '../Loader/Loader.js';

import './card.css';

const Card = ({
		item,
		children,
		view
	}) => {
		let types;

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

		return ( <
			> {
				view !== 'full' ? ( <
					div className = {
						cn('card')({
							view: view,
							border: 'all'
						})
					} >
					<
					div className = {
						cn('card', 'content')()
					} >
					<
					div className = {
						cn('card', 'status')({
							type: types
						})
					} >
					<
					AppIcon fa = {
						types
					}
					/> <
					/div> <
					div className = {
						cn('card', 'description')()
					} >
					<
					div className = {
						cn('card', 'text')()
					} >
					<
					div className = {
						cn(
							'card',
							'status'
						)({
							view: 'text',
							type: types,
						})
					} >
					#{
						item.buildNumber
					} <
					/div> <
					div className = {
						cn('card', 'text')()
					} > {
						item.commitMessage
					} < /div> <
					/div> <
					div className = {
						cn('card', 'subtext')()
					} >
					<
					AppIcon fa = 'code-commit' / >
					<
					Text content = {
						item.branchName
					}
					/> <
					a href = {
						`/detail/${item.id}/log`
					} > {
						item.commitHash
					} < /a> <
					AppIcon fa = 'user' / >
					<
					Text content = {
						item.authorName
					}
					/> <
					/div> <
					/div> {
						item.start && ( <
							div className = {
								cn('card', 'info')()
							} >
							<
							div className = {
								cn('card', 'date')()
							} >
							<
							AppIcon fa = 'calendar' / >
							<
							Text size = 'm'
							content = {
								new Date(item.start).toLocaleString(
									'ru',
									timeOptions
								)
							}
							/> <
							/div> <
							div className = {
								cn('card', 'time')()
							} >
							<
							AppIcon fa = 'clock' / >
							<
							Text size = 'm'
							content = {
								item.duration
							}
							/> <
							/div> <
							/div>
						)
					} <
					/div> <
					/div>
				) : ( <
					div className = {
						cn('card')({
							view: view,
							border: 'all'
						})
					} >
					<
					div className = {
						cn('card', 'content')()
					} > {
						item.buildNumber ? ( <
							>
							<
							div className = {
								cn(
									'card',
									'status'
								)({
									type: types,
								})
							} >
							<
							AppIcon fa = {
								types
							}
							/> <
							/div> <
							div className = {
								cn('card', 'description')()
							} >
							<
							div className = {
								cn('card', 'text')()
							} >
							<
							div className = {
								cn(
									'card',
									'status'
								)({
									view: 'text',
									type: types,
								})
							} >
							#{
								item.buildNumber
							} <
							/div> <
							div className = {
								cn('card', 'text')()
							} > {
								item.commitMessage
							} <
							/div> <
							/div> <
							div className = {
								cn('card', 'subtext')()
							} >
							<
							AppIcon fa = 'code-commit' / >
							<
							Text content = {
								item.branchName
							}
							/> <
							a href = {
								`/detail/${item.id}/log`
							} > {
								item.commitHash
							} < /a> <
							AppIcon fa = 'user' / >
							<
							Text content = {
								item.authorName
							}
							/> <
							/div> {
								item.start && ( <
									div className = {
										cn('card', 'info')()
									} >
									<
									div className = {
										cn('card', 'date')()
									} >
									<
									AppIcon fa = 'calendar' / >
									<
									Text size = 'm'
									content = {
										new Date(item.start).toLocaleString(
											'ru',
											timeOptions
										)
									}
									/> <
									/div> <
									div className = {
										cn('card', 'time')()
									} >
									<
									AppIcon fa = 'clock' / >
									<
									Text size = 'm'
									content = {
										item.duration
									}
									/> <
									/div> <
									/div>
								)
							} <
							/div> <
							/>
						) : ( <
							Loader / >
						)
					} <
					/div> <
					/div>
				)
			} {
				item.log && < Log text = {
					item.log
				}
				/>} <
				/>
			);
		};

		export default Card;