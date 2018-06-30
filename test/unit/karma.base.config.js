const path = require('path');

module.exports = {
    basePath: '../..',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
        'src/**/!(*.d).ts',
        'test/unit/**/*.ts'
    ],
    preprocessors: {
        'src/**/!(*.d).ts': ['karma-typescript'],
        'test/unit/**/*.ts': ['karma-typescript']
    },
    reporters: ['progress', 'karma-typescript'],
    karmaTypescriptConfig: {
        tsconfig: './tsconfig.test.json'
    }
};
