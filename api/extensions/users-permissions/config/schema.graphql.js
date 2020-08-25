module.exports = {
  query: `
      searchUsers(query: String, start: Int, limit: Int, sort: String): [UsersPermissionsUser]!
    `,
  resolver: {
    Mutation: {
      updateUser: {
        description: "Update user information",
        resolver: "plugins::users-permissions.user.updateMe"
      }
    },
    Query: {
      searchUsers: {
        description: "Search through all users",
        resolverOf: "plugins::users-permissions.user.find",
        resolver: async (obj, options, { context }) => {
          let { _query, ...params } = context.params;

          const results = await strapi
            .query("user", "users-permissions")
            .search({ _q: _query, ...params });

          return results;
        }
      }
    }
  }
};
