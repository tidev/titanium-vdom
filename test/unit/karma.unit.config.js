const base = require('./karma.base.config');

module.exports = config => {
    config.set(Object.assign(base, {
        karmaTypescriptConfig: Object.assign(base.karmaTypescriptConfig, {
            reports: {
                html: '../../coverage',
                'text-summary': null
            }
        }),
        singleRun: true
    }));
}
