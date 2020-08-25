module.exports = {
  query: `
      searchFaqs(query: String, start: Int, limit: Int, sort: String): [Faq]!
    `,
  resolver: {
    Query: {
      searchFaqs: {
        description: "Search through all faqs",
        resolverOf: "application::faq.faq.find",
        resolver: async (obj, options, { context }) => {
          let { _query, ...params } = context.params;

          const results = await strapi
            .query("faq")
            .search({ _q: _query, ...params });

          return results;
        }
      }
    }
  }
};
