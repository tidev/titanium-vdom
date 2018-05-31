module.exports = config => {
  config.set({
    frameworks: [ 'jasmine', 'karma-typescript' ],
    files: [
      'src/**/*.ts',
      'test/**/*.ts'
    ],
    preprocessors: {
      'src/**/*.ts': [ 'karma-typescript' ],
      'test/**/*.ts': [ 'karma-typescript' ]
    },
    reporters: [ 'progress', 'karma-typescript' ],
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
