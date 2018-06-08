const base = require('./karma.base.config');

module.exports = config => {
    config.set(Object.assign(base, {
        karmaTypescriptConfig: Object.assign(base.karmaTypescriptConfig, {
            reports: {
                'text-lcov': null
            }
        }),
        singleRun: true
    }));
}
