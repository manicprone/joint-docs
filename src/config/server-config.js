export default {

  // ---------------
  // Server settings
  // ---------------
  host: {
    development: '127.0.0.1',
    production: '127.0.0.1',
  },

  port: {
    development: 3000,
    production: 8080,
  },

  basePaths: {
    dist: '/dist',
    assets: '/public',
    styles: '/styles',
    auth: '/auth',
    api: '/api',
  },

  // -------------
  // Auth settings
  // -------------
  auth: {},

};
