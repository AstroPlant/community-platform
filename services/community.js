import slugify from "slugify";
import { getToken } from "../providers/Auth";
import { gqQuery, postJson, postRaw, queryfy } from "../utils/fetchTools";

const GRAPHQL_URL = "http://localhost:1337/graphql";

export const API_URL = "http://localhost:1337";

function getQuery(query, options = {}) {
  return gqQuery(GRAPHQL_URL, query, options);
}

/**********************************************
 *             HELP SECTIONS                  *
 **********************************************/

/***
 * Fetches all the FAQs categories
 */
export async function getHelpSections() {
  const query = `{ 
    helpSections {
      id
      slug
      title
    }
  }`;

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
      faqs {
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

/**
 * Search through the FAQs
 * @param {string} search words to look for
 * @param {int} start where to start on the result array
 * @param {int} limit maximum number of answers
 * @param {string} sort keywords to sort the results
 */
export async function searchFAQs(
  search,
  start = 0,
  limit = 10,
  sort = "id:desc"
) {
  const query = `{
    results: searchFaqs(query:"${search}", start: ${start}, limit: ${limit}, sort: "${sort}"){
      id
      question 
      answer
      updated_at
    }
  }`;

  return getQuery(query);
}

/**********************************************
 *                 ARTICLES                   *
 **********************************************/

/***
 * Fetches articles previews
 */
export async function getArticles() {
  const query = `{
    featured: articles(
      where: { published: true }
      sort: "published_at:desc"
      limit: 1
    ) {
      id
      slug
      published_at
      title
      preview
      cover {
        url
        alternativeText
      }
      author {
        username
        firstName
        lastName
        avatar {
          url
          alternativeText
        }
      }
    }
    previews: articles(
      where: { published: true }
      sort: "published_at:desc"
      start: 1
    ) {
      id
      slug
      published_at
      title
      preview
      cover {
        url
        alternativeText
      }
    }
  }`;

  const res = await getQuery(query);

  return res.data;
}

/***
 * Fetches the latest article to be displayed on the home page
 */
export async function getFeaturedArticle() {
  const query = `{
    articles(
      where: { published: true }
      sort: "published_at:desc"
      limit: 1
    ) {
      id
      slug
      title
      preview
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
export async function getFullArticle(slug) {
  const query = `{
    main_article: articles(where: { slug: "${slug}" }) {
      title
      published_at
      content
      cover {
        url
        alternativeText
      }
      author{ 
        username
        firstName
        lastName
        avatar { 
          url
          alternativeText
        }
      }
      categories {
        id
        title
      }
    }
    related_articles: articles(
      where: { published: true, slug_ne: "${slug}" },
      limit: 3
    ) {
      id
      slug
      published_at
      title
      preview
      cover {
        url
        alternativeText
      }
    }
}`;

  const res = await getQuery(query);

  return res.data;
}

/**
 * Search through the Articles
 * @param {string} search words to look for
 * @param {int} start where to start on the result array
 * @param {int} limit maximum number of answers
 * @param {string} sort keywords to sort the results
 */
export async function searchArticles(
  search,
  start = 0,
  limit = 10,
  sort = "id:desc"
) {
  const query = `{
    results: searchArticles(query:"${search}", start: ${start}, limit: ${limit}, sort: "${sort}"){
      id
      slug 
      published_at
      title
      preview
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

  return getQuery(query);
}

/**********************************************
 *                 USERS                      *
 **********************************************/

/***
 * Creates a new user
 * @param username the username from the user
 * @param password the user's password
 * @param email the user's email
 */
export async function createUser(email, username, password) {
  const path = "/auth/local/register";

  const body = {
    email: email,
    username: username,
    password: password,
  };

  return postJson(API_URL + path, body);
}

/***
 * Fetches the details of a user
 * @param username the username to fetch
 */
export async function getUserDetails(username) {
  const query = `{
    users(where: { username: "${username}" }) {
      id
      username
      email
      slackUsername
      firstName
      lastName
      description
      avatar {
        url
        alternativeText
      }
    }
  }`;

  const res = await getQuery(query);

  return res.data.users[0];
}

/***
 * Updates a user info on the API
 * @param updatedInfos the updated user info
 */
export async function updateUserInfo(id, updatedInfos) {
  const token = getToken("communityToken");
  const bearer = "Bearer " + token;

  const options = {};
  options.headers = { Authorization: bearer };

  const mutation = `mutation {
    updateUser(
      input: { 
        where: { 
          id: "${id}" 
        }, 
        data: ${queryfy(updatedInfos)}
      }) 
      {
      user {
        username
        email
        slackUsername
        firstName
        lastName
        description
      }
    }
  }`;

  return getQuery(mutation, options);
}

/***
 * Updates a user info on the API
 * @param userInfos the updated user info
 */
export async function changePassword(oldPassword, newPassword) {
  const token = getToken("communityToken");
  const bearer = "Bearer " + token;

  const options = {};
  options.headers = { Authorization: bearer };

  const body = { oldPassword, newPassword };

  return postJson(API_URL + "/users/changePassword", body, options);
}

/**********************************************
 *             LIBRARY SECTIONS               *
 **********************************************/

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
      featured_medias: library_medias(limit: 3, sort: "created_at:desc") {
        id
        title
        slug
        created_at
        media {
          type: __typename
          ... on ComponentMediaTypeLink {
            id
            url
          }
          ... on ComponentMediaTypeFile {
            id
            file {
              id
              created_at
              caption
              url
              mime
            }
          }
          ... on ComponentMediaTypeArticle {
            id
            title
            cover {
              url
              caption
            }
            content
          }
        }
      }
      all_medias: library_medias {
        id
      }
    }
  }
  `;

  const res = await getQuery(query);

  return res.data.librarySections;
}

/***
 * Fetches all library sections titles
 */
export async function getAllLibrarySectionNames() {
  const query = `{
    librarySections {
      id
      title
    }
  }
  `;

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
          type: __typename
          ... on ComponentMediaTypeLink {
            id
            url
          }
          ... on ComponentMediaTypeFile {
            id
            file {
              id
              created_at
              caption
              url
              mime
            }
          }
          ... on ComponentMediaTypeArticle {
            id
            title
            cover {
              url
              caption
            }
            content
          }
        }
      }
    }
    mediaCount: libraryMediasConnection(
      where: { library_section: { slug: "${slug}" } }
    ) {
      aggregate {
        count
      }
    }
  }`;

  const res = await getQuery(query);

  return res.data;
}

/**********************************************
 *             LIBRARY MEDIAS                 *
 **********************************************/

/***
 * Fetches a library media
 * @param slug of the media
 */
export async function getLibraryMedia(id) {
  const query = `{
    libraryMedia(id: ${id}) {
      id
      slug
      title
      created_at
      author {
        username
        firstName
        lastName
        avatar {
          url
          alternativeText
        }
      }
      media {
        type: __typename
        ... on ComponentMediaTypeLink {
          id
          url
        }
        ... on ComponentMediaTypeFile {
          id
          file {
            id
            created_at
            caption
            url
            mime
          }
        }
        ... on ComponentMediaTypeArticle {
          id
          title
          content
          cover {
            url
            caption
          }
        }
      }
    }
  }`;

  const res = await getQuery(query);

  return res.data.libraryMedia;
}

/**
 * Search through the libraryMedias
 * @param {string} search words to look for
 * @param {int} start where to start on the result array
 * @param {int} limit maximum number of answers
 * @param {string} sort keywords to sort the results
 */
export async function searchLibraryMedias(
  search,
  start = 0,
  limit = 10,
  sort = "id:desc"
) {
  const query = `{
    results: searchMedias(query:"${search}", start: ${start}, limit: ${limit}, sort: "${sort}"){
        id
        slug
        title
        created_at
        media {
          type: __typename
          ... on ComponentMediaTypeLink {
            id
            url
          }
          ... on ComponentMediaTypeFile {
            id
            file {
              id
              created_at
              caption
              url
              mime
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

  return getQuery(query);
}

/***
 * Creates a library media
 * @param body necessary informations to create the media
 */
export async function createLibraryMedia(body) {
  const token = getToken("communityToken");
  const bearer = "Bearer " + token;

  // Escaping quote carracters
  body.title = body.title.split('"').join('\\"');

  // Creating a slug
  const slug = slugify(body.title, {
    lower: true, // convert to lower case
    strict: true, // strip special characters except replacement
    locale: "en", // language code of the locale to use
    remove: /[*+~.()'"!:@]/g,
  });

  // Building typeName
  const typeName = `ComponentMediaType${body.type}`;

  // Building queries
  let fileID = null;
  let mediaQL = ``;

  switch (body.type) {
    case "Link":
      mediaQL = `url: "${body.url}"`;
      break;

    case "Article":
      if (body.articleCover) {
        const res = await upload([body.articleCover], {});

        if (!res.error) {
          fileID = res[0].id;
        } else {
          return res;
        }
      }

      mediaQL = `
        title: "${body.articleTitle}"
        content: "${body.articleContent}"
        cover: "${fileID}"
      `;
      break;

    case "File":
      if (body.file) {
        const res = await upload([body.file], {});

        if (!res.error) {
          fileID = res[0].id;
        } else {
          return res;
        }
      }

      mediaQL = `file: "${fileID}"`;
      break;

    default:
      break;
  }

  const mutation = `mutation {
    createLibraryMedia(
      input: {
        data: {
          title: "${body.title}"
          slug: "${slug}"
          library_section: ${body.librarySection}
          author: ${body.user}
          media: {
            __typename: "${typeName}"
            ${mediaQL}
          }
        }
      }
    ) {
      libraryMedia {
        id
        created_at
        title
      }
    }
  }
  `;

  const options = {};
  options.headers = { Authorization: bearer };

  return getQuery(mutation, options);
}

/**********************************************
 *                USERS GRAPHS                *
 **********************************************/

/**
 *
 * @param {*} username
 * @param {*} kitSerial
 */
export async function getUsersGraphs(username, kitSerial) {
  // TODO Implement with a real API Call
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
 * Logs the user and stores the token cookies
 * @param username the username from the user
 * @param password the user's password
 */
export async function login(username, password) {
  const path = "/auth/local";

  const body = {
    identifier: username,
    password: password,
  };

  return postJson(API_URL + path, body);
}

/***
 * Logs the user and stores the token cookies
 * @param username the username from the user
 * @param password the user's password
 */
export async function forgotPassword(email) {
  const path = "/auth/forgot-password";

  const body = { email };

  const res = await postJson(API_URL + path, body);

  return res;
}

/**********************************************
 *                CHALLENGES                  *
 **********************************************/

export async function getChallenges() {
  //TODO Implement
  return [];
}

/**********************************************
 *                UPLOAD                      *
 **********************************************/

/**
 * Upload a file related to an instance to the communtiy API
 * @param {FileList} files The file(s) to upload. The value(s) can be a Buffer or Stream.
 * @param {object} optionalParameters
 * refId:  The ID of the entry which the file(s) will be linked to.
 * ref:  The name of the model which the file(s) will be linked to (see more below).
 * field: The field of the entry which the file(s) will be precisely linked to.
 * source: The name of the plugin where the model is located.
 */
export async function upload(
  files,
  optionalParameters = ({ refId, ref, field, source } = {})
) {
  const token = getToken("communityToken");
  const bearer = "Bearer " + token;

  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  Object.keys(optionalParameters).map((key) => {
    if (typeof optionalParameters[key] !== "undefined") {
      formData.append(key, optionalParameters[key]);
    }
  });

  return postRaw(API_URL + "/upload", formData, {
    headers: {
      Authorization: bearer,
    },
  });
}
