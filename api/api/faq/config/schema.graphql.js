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
          const results = await strapi
            .query("faq")
            .search({ _q: context.params._query, ...context.params });

          return results;
        },
      },
    },
  },
};
