const {
  shareAll,
  withModuleFederationPlugin,
  DEFAULT_SKIP_LIST,
  DEFAULT_SECONARIES_SKIP_LIST
} = require('@angular-architects/module-federation/webpack');

const config = withModuleFederationPlugin({

  // Remotes are loaded dynamically at runtime via loadRemoteModule()
  // in app.routes.ts, so no build-time "remotes" map is needed here.

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

// Avoid 'auto' publicPath: it makes webpack emit import.meta.url in every
// chunk (including the non-module "styles" chunk that the Angular CLI's
// index.html generation doesn't mark as type="module"), which breaks at runtime.
config.output.publicPath = '/';

module.exports = config;
