const API_URL = "http://localhost:1337/graphql";

/***
 * Fetch model to query data from the API
 */
async function getQuery(query) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  });

  return res.json();
}

/***
 * Fetches all the FAQs categories
 */
export async function getFAQCategories() {
  const query = `{ categories{
      id
      slug 
      name
    } }`;

  const res = await getQuery(query);

  return res.data.categories;
}

/***
 * Fetches all the FAQs from a specific category
 */
export async function getCategoryBySlug(slug) {
  const query = `{ 
        categories(where: { slug: "${slug}" }) {
          name
          faqs{
            id
            question 
            answer
            updated_at
          }
        } 
      }`;

  const res = await getQuery(query);

  return res.data.categories[0];
}

/***
 * Fetches the first articles previews
 */
export async function getArticlesPreview() {
  const query = `{articles{
      id
      slug 
      title
      short_description
      cover { url }
      author{ username }
    }}`;

  const res = await getQuery(query);

  return res.data.articles;
}

/***
 * Fetches the first articles previews
 */
export async function getFullArticle(slug) {
  const query = `{
  articles(where: { slug: "${slug}" }) {
    title
    created_at
    content
    cover {
      url
      caption
    }
    created_at
    author{ username }
  }
}`;

  const res = await getQuery(query);

  return res.data.articles[0];
}
