module.exports = {
  query: `
      searchArticles(query: String, start: Int, limit: Int, sort: String): [Article]!
    `,
  resolver: {
    Query: {
      searchArticles: {
        description: "Search through all articles",
        resolverOf: "application::article.article.find",
        resolver: async (obj, options, { context }) => {
          const results = await strapi
            .query("article")
            .search({ _q: context.params._query, ...context.params });

          return (
            results || `There is no articles corresponding to your search.`
          );
        },
      },
    },
  },
};
