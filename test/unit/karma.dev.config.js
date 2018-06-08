const base = require('./karma.base.config');

const devConfig = Object.assign(base, {
    reporters: ['min', 'notify'],
    autoWatch: true
});
devConfig.karmaTypescriptConfig.coverageOptions.instrumentation = false;

module.exports = config => {
    config.set(devConfig);
}
