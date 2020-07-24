module.exports = {
  query: `
      searchMedias(query: String, start: Int, limit: Int, sort: String): [LibraryMedia]!
    `,
  resolver: {
    Query: {
      searchMedias: {
        description: "Search through all medias",
        resolverOf: "application::library-media.library-media.find",
        resolver: async (obj, options, { context }) => {
          const results = await strapi
            .query("library-media")
            .search({ _q: context.params._query, ...context.params });

          return results;
        },
      },
    },
  },
};
