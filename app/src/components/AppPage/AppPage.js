import React from 'react';
import cn from '../../libs/names/index.js';

import Header from '../AppHeader/AppHeader.js';
import Footer from '../AppFooter/AppFooter.js';

import Grid from '../Grid/Grid.js';
import Button from '../AppButton/AppButton.js';
import Icon from '../AppIcon/AppIcon.js';
import Text from '../text/Text.js';
import History from '../History/History.js';
import Form from '../form/Form.js';
import Title from '../title/Title.js';

import './AppPage.css';
import '../layout/layout.css';
import '../theme/theme.css';
import '../theme/_size/theme_size_default.css';
import '../theme/_space/theme_space_default.css';
import '../theme/_color/theme_color_project-default.css';
import '../theme/_color/theme_color_project-inverse.css';
import '../theme/_gap/theme_gap_small.css';

const Theme = cn('theme')({
	gap: 'small',
	space: 'default',
	size: 'default',
	color: 'project-default'
});

const blockName = cn('page')() + ` ${Theme}`;

const Page = ({ view, children, data, title }) => {
	switch (view) {
		case 'index':
			return (
				<div className={blockName}>
					<Header title={title} />
					<section>
						<Grid cols='12'>
							<Icon fa='configure' big />
							<Text
								type='p'
								size='l'
								content='Configure repository connection and synchronization settings'
							/>
							<Button
								width='full'
								size='xl'
								view='active'
								text='Open settings'
							/>
						</Grid>
					</section>
					<Footer />
				</div>
			);
		case 'history':
			return (
				<div className={blockName}>
					<Header title={title} />
					<section>
						<div className='layout'>
                            <History items={data} />
						</div>
					</section>
					<Footer />
				</div>
			);
		case 'settings':
			return (
				<div className={blockName}>
					<Header title={title} />
					<section>
						<div className='layout'>
                            <Title text='Settings' subtitle='Configure repository connection and synchronization settings' />
                            <Form />
						</div>
					</section>
					<Footer />
				</div>
			);
        case 'detail':
			return (
				<div className={blockName}>
					<Header title={title} />
                    <section>
                        <div className='layout'>
                            <History view='detail' items={data}/>
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

export default Page;
