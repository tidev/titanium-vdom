module.exports = config => {
  config.set({
    frameworks: [ 'jasmine', 'karma-typescript' ],
    files: [
      'src/**/*.ts',
      'test/**/*.ts'
    ],
    logLevel: config.LOG_DEBUG, 
    preprocessors: {
      'src/**/*.ts': [ 'karma-typescript' ],
      'test/**/*.ts': [ 'karma-typescript' ]
    },
    reporters: [ 'progress', 'karma-typescript' ],
    browsers: [ 'ios' ],
    customLaunchers: {
      ios: {
        base: 'Titanium',
        platform: 'ios'
      }
    },
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
      compilerOptions: {
        sourceMap: true
      },
      include: [ './test/**/*.spec.ts' ]
    },
    singleRun: true
  });
};
