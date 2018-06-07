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
        target: 'es5',
        module: 'commonjs',
        sourceMap: true,
        lib: [
          "es2015",
          "es2015.iterable"
        ],
        downlevelIteration: true
      },
      include: [ './test/**/*.spec.ts' ]
    },
    singleRun: true
  });
};
