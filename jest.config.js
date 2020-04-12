module.exports = {
    setupFiles: ['./jestsetup.js'],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.css$': 'jest-transform-css',
    },
};
