const {
  shareAll,
  withModuleFederationPlugin,
  DEFAULT_SKIP_LIST,
  DEFAULT_SECONARIES_SKIP_LIST
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'bbog-frontend-portal-mf1',

  exposes: {
    './Component': './src/app/app.ts',
  },

  shared: {
    // bbog-commons-lib-frontend-event-bus is installed via a local "file:" dependency,
    // whose version string isn't valid semver, so it can't be auto-shared as a singleton.
    // It doesn't need to be: shell and mf1 talk through window postMessage/CustomEvent,
    // not through sharing the same module instance, so each side just bundles its own copy.
    ...shareAll(
      { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      [...DEFAULT_SKIP_LIST, ...DEFAULT_SECONARIES_SKIP_LIST, 'bbog-commons-lib-frontend-event-bus']
    ),
  },

});
