export const API_URL = "http://localhost:1337";

const GRAPHQL_URL = "http://localhost:1337/graphql";

/***
 * Fetch model to query data from the API
 */
async function getQuery(query) {
  const res = await fetch(GRAPHQL_URL, {
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
 * Fetches the latest article
 */
export async function getFeaturedArticle() {
  const query = `{
  articles(sort: "created_at:desc") {
    title
    short_description
    cover {
      url
    }
  }
}`;

  const res = await getQuery(query);

  return res.data.articles[0];
}

/***
 * Fetches the first articles previews
 */
export async function getArticlesPreview() {
  const query = `{articles(sort: "created_at:desc"){
      id
      slug 
      created_at
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

export async function getUsersGraphs(username, kitSerial) {
  const graphs = [
    {
      id: 24,
      username: "rmnrss",
      kitSerial: "k-krmw-vp3y-v4g9",
      configId: 4,
      title: "Temperature Over Time",
      peripherals: [{ id: 12, peripheralDefinitionId: 1, quantityTypeId: 3 }],
    },
    {
      id: 25,
      username: "rmnrss",
      kitSerial: "k-mqym-kdc8-b3t9",
      configId: 14,
      title: "Temperature Over Time",
      peripherals: [{ id: 44, peripheralDefinitionId: 6, quantityTypeId: 1 }],
    },
  ];

  let matchingGraphs = [];

  for (let graph of graphs) {
    if (username === graph.username && kitSerial === graph.kitSerial) {
      matchingGraphs.push(graph);
    }
  }

  return matchingGraphs;
}
