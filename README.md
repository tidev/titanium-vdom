# Titanium Virtual DOM

Virtual DOM abstraction which serves as the connecting piece to integrate Angular and Vue.js with Titanium.

## Development guide

This project uses an expiremental unit testing setup using the new [titanium-karma-runner](https://github.com/appcelerator/titanium-karma-runner). To run unit tests spin up the Karma server using `npm run test:unit`. Now run the titanium-karma-runner app on an iOS simulator or Android emulator and the tests will be run inside that app. Results will be shown in the app itself and coverage data gets written to the `coverage` directory.

For a rapid TDD setup you can use `npm run test:unit-dev` and Karma will watch for any changes to the source and test files and schedule a new test run everytime. No coverage data will be written in this configuration.

## Contributions

Open source contributions are greatly appreciated! If you have a bugfix, improvement or new feature, please create
[an issue](https://github.com/appcelerator-modules/titanium-socketio/issues/new) first and submit a [pull request](https://github.com/appcelerator-modules/titanium-socketio/pulls/new) against master.

## Getting Help

This is a supporting library to integrate Angular and Vue.js with Titanium. If you have questions about this library in combination with either Angular or Vue.js, feel free to reach out on Stackoverflow or the corresponding channels
`#titanium-angular` or `titanium-vue` on [TiSlack](http://tislack.org). In case you find a bug related to this library, create a [new issue](/issues/new)
or open a [new JIRA ticket](https://jira.appcelerator.org).

## License

Apache License, Version 2.0