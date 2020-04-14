module.exports = {
    sets: {
        desktop: {
            files: './tests.hermione.js',
        },
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome', // this browser should be installed on your OS
            },
        },
    },
};
