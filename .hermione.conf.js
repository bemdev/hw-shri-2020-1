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
                'goog:chromeOptions': {
                    w3c: false,
                },
            },
        },
    },
};
