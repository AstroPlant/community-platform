const GRAPHQL_URL = "http://localhost:1337/graphql";

export const API_URL = "http://localhost:1337";

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
export async function getHelpSections() {
  const query = `{ helpSections {
    title
    id
    slug
  }}`;

  const res = await getQuery(query);

  return res.data.helpSections;
}

/***
 * Fetches all the FAQs from a specific category
 */
export async function getHelpSectionBySlug(slug) {
  const query = `{ 
    helpSections(where: { slug: "${slug}" }) {
          title
          faqs{
            id
            question 
            answer
            updated_at
          }
        } 
      }`;

  const res = await getQuery(query);

  return res.data.helpSections[0];
}

/***
 * Fetches the latest article
 */
export async function getFeaturedArticle() {
  const query = `{
  articles(sort: "created_at:desc") {
    title
    slug
    created_at
    short_description
    cover {
      url
      alternativeText
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
  const query = `{
    articles(sort: "created_at:desc") {
      id
      slug 
      created_at
      title
      short_description
      cover { 
        url 
        alternativeText
      }
      author { 
        username
        firstName
        lastName
      }
    }
  }`;

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
        alternativeText
      }
      author{ 
        username
        firstName
        lastName
        picture { 
          url
          alternativeText
        }
      }
      categories {
        id
        title
      }
    }
}`;

  const res = await getQuery(query);

  return res.data.articles[0];
}

/***
 * Fetches the details of a user
 * @param username the username to fetch
 */
export async function getUserDetails(username) {
  const query = `{
    users(where: { username: "${username}" }) {
      username
      firstName
      lastName
      description
      slackUsername
      picture {
        url
      }
    }
  }`;

  const res = await getQuery(query);

  return res.data.users[0];
}

/***
 * Updates a user info on the API
 * @param userInfos the updated user info
 */
export async function updateUserInfo(userInfos) {
  //TODO Implement
}

/***
 * Updates a user info on the API
 * @param userInfos the updated user info
 */
export async function resetPassword(password, newPassword) {
  //TODO Implement
}

/***
 * Fetches all library sections
 */
export async function getAllLibrarySections() {
  const query = `{
    librarySections {
      id
      slug
      title
      description
    }
  }`;

  const res = await getQuery(query);

  return res.data.librarySections;
}

/***
 * Fetches a library section
 * @param slug of the section
 */
export async function getLibrarySection(slug) {
  const query = `{
    librarySections(where: { slug: "${slug}" }) {
      id
      slug
      title
      description
      library_medias {
        id
        title
        created_at
        media {
          __typename
          ... on ComponentMediaTypeLink {
            id
            url
          }
          ... on ComponentMediaTypeFile {
            id
            name
            file {
              id
              created_at
              caption
            }
          }
          ... on ComponentMediaTypeArticle {
            id
            title
            cover {
              caption
            }
            content
          }
        }
      }
    }
  }`;

  const res = await getQuery(query);

  return res.data.librarySections[0];
}

/***
 * Fetches a library media
 * @param slug of the media
 */
export async function getLibraryMedia(slug) {
  const query = `{
    libraryMedias(where: { slug: "${slug}" }) {
      id
      slug
      title
      media {
        __typename
        ... on ComponentMediaTypeLink {
          id
          url
        }
        ... on ComponentMediaTypeFile {
          id
          name
          file {
            id
            created_at
            caption
          }
        }
        ... on ComponentMediaTypeArticle {
          id
          title
          cover {
            caption
          }
          content
        }
      }
    }
  }`;

  const res = await getQuery(query);

  return res.data.libraryMedias[0];
}

/***
 * Fetches featured library medias
 */
export async function getFeaturedLibraryMedias() {
  const query = `{
    libraryMedias {
      id
      slug
      title
      media {
        __typename
        ... on ComponentMediaTypeLink {
          id
          url
        }
        ... on ComponentMediaTypeFile {
          id
          name
          file {
            id
            created_at
            caption
          }
        }
        ... on ComponentMediaTypeArticle {
          id
          title
          cover {
            caption
          }
          content
        }
      }
    }
  }`;

  const res = await getQuery(query);

  return res.data.libraryMedias;
}

export async function getUsersGraphs(username, kitSerial) {
  const graphs = [
    {
      id: 24,
      title: "Humidity Over Time",
      type: "bar",
      owner: "rmnrss",
      kitSerial: "k-krmw-vp3y-v4g9",
      configId: 4,
      peripherals: [{ id: 12, peripheralDefinitionId: 3, quantityTypeId: 3 }],
    },
    {
      id: 25,
      owner: "rmnrss",
      title: "Temperature Over Time",
      type: "line",
      kitSerial: "k-mqym-kdc8-b3t9",
      configId: 14,
      peripherals: [{ id: 44, peripheralDefinitionId: 6, quantityTypeId: 1 }],
    },
  ];

  let matchingGraphs = [];

  for (let graph of graphs) {
    if (username === graph.owner && kitSerial === graph.kitSerial) {
      matchingGraphs.push(graph);
    }
  }

  return matchingGraphs;
}

/***
 * POST request template
 * @param apiPath the path of the api where to send the request
 */
async function postRequest(apiPath, body) {
  const url = API_URL + apiPath;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body,
    });

    return res;
  } catch (error) {
    return {};
  }
}

/***
 * Logs the user and stores the token cookies
 * @param username the username from the user
 * @param password the user's password
 */
export async function login(username, password) {
  const path = "/auth/local";

  const body = JSON.stringify({
    identifier: username,
    password: password,
  });

  const res = await postRequest(path, body);

  return res;
}

/***
 * Creates a new user
 * @param username the username from the user
 * @param password the user's password
 * @param email the user's email
 */
export async function createUser(email, username, password) {
  const mutation = `mutation {
    createUser(
      input: {
        data: { username: "${username}", 
        email: "${email}",
        password: "${password}"}
      }
    ) {
      user {
        username
        email
      }
    }
  }`;

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: mutation,
    }),
  });

  return res;
}

export async function getChallenges() {
  //TODO Implement
  return [];
}
