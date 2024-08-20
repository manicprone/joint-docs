module.exports = {

  // ----------------
  // App name & alias
  // ----------------
  name: 'Joint Kit Docs',
  alias: 'joint-docs',

  // -----------
  // App version
  // -----------
  version: '0.0.1',

  // ------------------
  // App URI base paths
  // ------------------
  basePaths: {
    docs: '/docs'
  },

  // -------------------------------------------
  // App settings
  // -------------------------------------------
  // Core configuration settings for the app.
  // These values cannot be altered by the user.
  // -------------------------------------------
  appSettings: {
    // The default section (when not provided, or with router error)
    defaultSection: 'about',

    // Root content pages (per section)
    rootPages: {
      about: 'overview',
      guide: 'installation',
      api: 'index',
      advanced: 'index',
      examples: 'index'
    }
  }

}
