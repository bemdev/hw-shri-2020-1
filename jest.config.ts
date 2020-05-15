module.exports = {
    setupFiles: ['./jestsetup.ts'],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts',
    },
    transform: {
        '^.+\\.ts$': 'babel-jest',
        '^.+\\.css$': 'jest-transform-css',
    },
};
