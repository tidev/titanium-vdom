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
    reporters: ['karma-typescript'],
    karmaTypescriptConfig: {
        tsconfig: './tsconfig.test.json'
    },
    concurrency: 1
};
