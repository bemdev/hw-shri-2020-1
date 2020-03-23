import * as React from 'react';
import Page from '../AppPage/AppPage.js';

import Grid from '../Grid/Grid.js';
import Button from '../AppButton/AppButton.js';

import '../theme/theme.css';
import '../theme/_size/theme_size_default.css';
import '../theme/_space/theme_space_default.css';
import '../theme/_color/theme_color_project-default.css';
import '../theme/_color/theme_color_project-inverse.css';
import '../theme/_gap/theme_gap_small.css';

const App = () => {
    return (
        <Page>
            <section>
                <Grid cols='12'>
                    {/* <Icon /> */}
                    {/* <Text /> */}
                    <Button />
                </Grid>
            </section>
        </Page>
    );
};

export default App;
