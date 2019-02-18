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
            sdkVersion: '7.5.0.GA'
        },
        customLaunchers: {
            ios: {
                base: 'Titanium',
                browserName: 'iPhone Simulator',
                platform: 'ios'
            },
            android: {
                base: 'Titanium',
                browserName: 'Android Emulator',
                platform: 'android'
            }
        },
        reporters: base.reporters.concat([ 'mocha' ]),
        browsers: [ 'android', 'ios' ],
        singleRun: true,
        retryLimit: 0,
        captureTimeout: 300000
    }));
}
