# Titanium Virtual DOM

[![Coverage Status](https://coveralls.io/repos/github/appcelerator/titanium-vdom/badge.svg?branch=master)](https://coveralls.io/github/appcelerator/titanium-vdom?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/appcelerator/titanium-vdom.svg)](https://greenkeeper.io/)

Virtual DOM abstraction which serves as the connecting piece to integrate Angular and Vue.js with Titanium.

## Development guide

This project uses the [karma-titanium-launcher](https://github.com/appcelerator/karma-titanium-launcher) to run unit tests. Simply run `npm run test:unit` to start Karma and test on an iOS simulator and Android emulator. Results will be shown in the app itself as well as reported to the console and coverage data gets written to the `coverage` directory.

For a rapid TDD setup you can use `npm run test:dev` and Karma will watch for any changes to the source and test files and schedule a new test run everytime. No coverage data will be written in this configuration.

## Contributions

Open source contributions are greatly appreciated! If you have a bugfix, improvement or new feature, please create
[an issue](https://github.com/appcelerator-modules/titanium-socketio/issues/new) first and submit a [pull request](https://github.com/appcelerator-modules/titanium-socketio/pulls/new) against master.

## Getting Help

This is a supporting library to integrate Angular and Vue.js with Titanium. If you have questions about this library in combination with either Angular or Vue.js, feel free to reach out on Stackoverflow or the corresponding channels
`#titanium-angular` or `titanium-vue` on [TiSlack](http://tislack.org). In case you find a bug related to this library, create a [new issue](/issues/new)
or open a [new JIRA ticket](https://jira.appcelerator.org).

## License

Apache License, Version 2.0
