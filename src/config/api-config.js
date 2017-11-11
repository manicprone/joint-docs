export default {

  // ----------------
  // API name & alias
  // ----------------
  name: 'Joint Docs',
  alias: 'joint-docs',

  // -----------
  // API version
  // -----------
  version: '0.0.0',

  // -----------------------------------------------------
  // API URI path settings
  // -----------------------------------------------------
  // The exposed API URI will be constructed as:
  // <api_base_path> + module + version + <resource_uri>
  //
  // e.g.
  // GET /api/blog/v1/user/333
  // -----------------------------------------------------
  path: {
    module: '',
    version: '/v1',
  },

};
