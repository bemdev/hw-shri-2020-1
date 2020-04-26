import React from 'react';
import cn from '../../libs/names';

import Text from '../Text/Text';

import './__subtitle/title__subtitle.css';

export interface TitleProps {
	text: string;
	subtitle: string;
}

const Title: React.FC<TitleProps> = ({ text, subtitle }) => {
	return (
		<div className={cn('title')()}>
			<Text size='xl' type='h2' content={text} />
			<div className={cn('title', 'subtitle')()}>
				<Text size='l' type='h3' content={subtitle} />
			</div>
		</div>
	);
};

export default Title;
