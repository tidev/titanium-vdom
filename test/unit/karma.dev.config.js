const base = require('./karma.base.config');

const devConfig = Object.assign(base, {
    reporters: base.reporters.concat([ 'helpful', 'notify' ]),
    helpfulReporter: {
        clearScreenBeforeEveryRun: true,
    },
    autoWatch: true,
    browsers: [ 'ios' ],
});
devConfig.karmaTypescriptConfig.reports = {
    'text-summary': null
}

module.exports = config => {
    devConfig.logLevel = config.LOG_DEBUG;
    config.set(devConfig);
}
