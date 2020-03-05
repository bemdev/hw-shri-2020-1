window.onload = function () {
    
    const onOffSwitch = document.getElementsByClassName('onoffswitch')[0];
    const onOffButton = document.getElementsByClassName('onoffswitch__button')[0];
    const body = document.getElementsByTagName('body')[0];

    const accordionShow = (path) => {
        const accordionMore = path.getElementsByClassName('e-accordion__more')[0];
        accordionMore.classList.toggle('e-accordion__more_show');
    };

    const switchTheme = (checked) => {
        const themes = ['default', 'inverse'];
        let theme;

        if (checked) {
            theme = document.getElementsByClassName(`theme_color_project-${themes[0]}`)[0];
    
            onOffSwitch.classList.remove(checked);
            theme.classList.remove(`theme_color_project-${themes[0]}`);
            theme.classList.add(`theme_color_project-${themes[1]}`);
            onOffButton.style.left = '4%';
    
        } else {
            theme = document.getElementsByClassName(`theme_color_project-${themes[1]}`)[0];
    
            onOffSwitch.classList.add('onoffswitch_checked');
            theme.classList.remove(`theme_color_project-${themes[1]}`);
            theme.classList.add(`theme_color_project-${themes[0]}`);
            onOffButton.style.left = '73%';
        }
    };

    body.addEventListener('click', (e) => {
        const path = e.path || (e.composedPath && e.composedPath()); //Safari path fix
        path.forEach(path => {
            if (path.classList) {
                if (path.classList.contains('e-accordion')) {
                    accordionShow(path);
                }
                if (path.classList.contains('onoffswitch__button')) {
                    switchTheme(onOffSwitch.classList[1]);
                }
            }
        });
    });

};