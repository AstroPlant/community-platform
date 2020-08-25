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
          let { _query, ...params } = context.params;

          const results = await strapi
            .query("article")
            .search({ _q: _query, published_eq: true, ...params });

          return results;
        }
      }
    }
  }
};
