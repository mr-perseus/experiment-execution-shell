# Generic Test Execution Shell

## Overview

The generic test execution shell is a electron program that will execute
tests that can be defined in JSON configuration files.

For a detailed introduction and tutorials for the used technologies have a look into the original documentations:

- NodeJS: https://nodejs.org
- Electron: https://electronjs.org/
- ReactJS: https://reactjs.org/
- Electron-React-Boilerplate: https://electron-react-boilerplate.js.org/
- Yarn: https://yarnpkg.com
- Webpack: https://webpack.js.org/
- Flow: https://flow.org/
- ESLint: https://eslint.org/
- BabelJS: https://babeljs.io/

Libraries:

- Mousetrap: https://craig.is/killing/mice
- I18next: https://www.i18next.com/
- Jsonschema: https://github.com/tdegrunt/jsonschema
- await-timeout: https://github.com/vitalets/await-timeout

CI:

- Travis: https://travis-ci.org/

Testing:

- Enzyme: https://airbnb.io/enzyme/
- Testcafe: https://testcafe.devexpress.com/
- Jest: https://jestjs.io/

## Quick Start

### Development

Start a local webpack development server with `yarn dev`. This starts a local webpack server with source maps and
hot module replacement. When in development, the JSON configuration files are loaded from the project `resource`
directory by default.

### Testing

Tests can be executed with `yarn test` and `yarn test-e2e`. Build the app with `yarn build-e2e` first to run the end
to end tests.

### Starting the App

The program can be started with `yarn start`. Use `yarn build` to build it first.

### Packaging and More

Have a look into the package.json file for a complete list of a supported scripts and commands.

## Continuous Integration

The project contains a complete TravisCI configuration file that is able to create packages for Linux, Mac and Windows.

## Creating Experiment Configuration Files

Place a `experiments.json` file in the resource path of your electron app. It consists of a single array with the
experiment configuration file names in relation to itself.

As example, having the configuration files `~/app/experiments.json` and `~/app/simple-experiment.json`

experiments.json would contain

```json
["simple-experiment.json"]
```

and the simple-experiment.json has to be according to the schema described in `app/constants/experimentConfigSchema`

An example configuration can be found in the resource folder of this project.
