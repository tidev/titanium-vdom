const path = require('path');

const base = require('./karma.base.config');

module.exports = config => {
    config.set(Object.assign(base, {
        karmaTypescriptConfig: Object.assign(base.karmaTypescriptConfig, {
            reports: {
                html: 'coverage',
                'text-summary': null
            }
        }),
        titanium: {
            sdkVersion: '9.0.0.GA'
        },
        reporters: base.reporters.concat([ 'mocha', 'junit' ]),
        junitReporter: {
            outputFile: path.resolve(__dirname, '..', '..', 'junit_report.xml')
        },
        singleRun: true,
        retryLimit: 0,
        captureTimeout: 600000,
        logLevel: config.LOG_DEBUG
    }));
}
