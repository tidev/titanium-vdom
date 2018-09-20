const base = require('./karma.base.config');

module.exports = config => {
    config.set(Object.assign(base, {
        karmaTypescriptConfig: Object.assign(base.karmaTypescriptConfig, {
            reports: {
                html: 'coverage',
                'text-summary': null
            }
        }),
        customLaunchers: {
            // testing on iOS needs TIMOB-26184 and TIMOB-26179, will probably land with 7.5.0
            ios: {
                base: 'Titanium',
                browserName: 'iphone',
                platform: 'ios',
                sdkVersion: '7.5.0.GA'
            },
            android: {
                base: 'Titanium',
                browserName: 'Android Emulator',
                platform: 'android',
                sdkVersion: '7.4.0.GA'
            }
        },
        browsers: ['android'],
        singleRun: true,
        retryLimit: 0,
        captureTimeout: 300000
    }));
}
