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

  return res;
}

/***
 * Fetches all the FAQs categories from the API
 */
export async function getFAQCategories() {
  const res = await getQuery(`{ categories{
      id 
      name
    } }`);

  return res.json();
}

/***
 * Fetches all the FAQs from a specific category
 */
export async function getFAQsofCategory(CategoryId) {
  const res = await getQuery(`{ 
        category(id: "${CategoryId}") {
          faqs{
            id
            question 
            answer
            updated_at
          }
        } 
      }`);

  return res.json();
}

/***
 * Returns an array of params including the categories id's
 * from the API
 */
export async function getCategoriesIds() {
  const query = await getFAQCategories();

  return query.data.categories.map((category) => {
    return {
      params: {
        name: category.name.toLowerCase(),
      },
    };
  });
}
