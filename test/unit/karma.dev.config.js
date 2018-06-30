const base = require('./karma.base.config');

const devConfig = Object.assign(base, {
    reporters: ['helpful', 'notify', 'karma-typescript'],
    helpfulReporter: {
        clearScreenBeforeEveryRun: true,
    },
    autoWatch: true
});
devConfig.karmaTypescriptConfig.reports = {
    'text-summary': null
}

module.exports = config => {
    config.set(devConfig);
}
