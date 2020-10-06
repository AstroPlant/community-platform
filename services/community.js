import { getToken, updateLocalUser } from "../providers/Auth";
import {
  gqQuery,
  hasError,
  postJson,
  postRaw,
  queryfy,
} from "../utils/fetchTools";

const onClientSide = typeof window !== "undefined";

export const API_URL = onClientSide
  ? process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL
  : process.env.NEXT_PUBLIC_STRAPI_CLUSTER_URL;

const GRAPHQL_URL = `${API_URL}/graphql`;

function getQuery(query, options = {}) {
  return gqQuery(GRAPHQL_URL, query, options);
}

function createBearer() {
  const token = getToken("communityToken");
  return "Bearer " + token;
}

function createOptionsWithBearer() {
  return {
    headers: {
      Authorization: createBearer(),
    },
  };
}

/**********************************************
 *             HELP SECTIONS                  *
 **********************************************/

/***
 * Fetches all help sections slugs
 */
export async function getHelpSectionsPaths() {
  const query = `{
    helpSections {
      slug
    }
  }
  `;

  const res = await getQuery(query);

  return res.data.helpSections;
}

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

/**********************************************
 *                 ARTICLES                   *
 **********************************************/

const imageModel = `{
  url
  alternativeText
}`;

const completeFileModel = `{
  id
  url
  caption
  name
  ext
  type: mime
  size
}`;

const authorModel = `{
  username
  firstName
  lastName
  description
  avatar ${imageModel}
 }
`;

const contentModel = `{
  type: __typename
  ... on ComponentContentTypeFile {
    id
    title
    description
    file ${completeFileModel}
  }
  ... on ComponentContentTypeLink {
    id
    url
    url_caption: caption
    meta_title
    meta_description
    meta_image_url
    meta_publisher
  }
  ... on ComponentContentTypeImage {
    id
    caption
    image ${completeFileModel}
  }
  ... on ComponentContentTypeRichText {
    id
    text
  }
}`;

/***
 * Fetches articles slugs for Static Generation
 */
export async function getArticlesPaths() {
  const query = `{
    articles(where: { published: true }) {
      slug
    }
  }`;

  const res = await getQuery(query);

  return res.data.articles;
}

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
      cover ${imageModel}
      author ${authorModel}
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
      cover ${imageModel}
    }
  }`;

  const res = await getQuery(query);

  return res.data;
}

/***
 * Fetches the first articles previews
 */
export async function getFullArticle(slug) {
  const query = `{
    main_article: articles(where: { slug: "${slug}" }) {
      title
      published_at
      content ${contentModel}
      cover ${imageModel}
      author ${authorModel}
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
    }
}`;

  const res = await getQuery(query);

  return res.data;
}

/**********************************************
 *                 USERS                      *
 **********************************************/

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
      avatar ${imageModel}
      role {
        id
        name
      }
    }
  }`;

  const res = await getQuery(query);

  if (!hasError(res)) {
    updateLocalUser(res.data.users[0]);
    return res.data.users[0];
  } else {
    return res.data.users[0];
  }
}

/***
 * Updates a user info on the API
 * @param updatedInfos the updated user info
 */
export async function updateUserInfo(id, updatedInfos) {
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
          id
          username
          email
          slackUsername
          firstName
          lastName
          description
          avatar ${imageModel}
          role {
            id
            name
          }
        }
      }
  }`;

  const options = createOptionsWithBearer();

  const res = await getQuery(mutation, options);

  if (!hasError(res)) {
    updateLocalUser(res.data.updateUser.user);
    return res;
  } else {
    return res;
  }
}

/***
 * Updates a user info on the API
 * @param userInfos the updated user info
 */
export async function changePassword(oldPassword, newPassword) {
  const body = { oldPassword, newPassword };

  const options = createOptionsWithBearer();

  return postJson(API_URL + "/users/changePassword", body, options);
}

/**********************************************
 *             LIBRARY MEDIAS                 *
 **********************************************/

const completeLibraryMedia = `
  {
    id
    title
    slug
    type
    created_at
    cover ${completeFileModel}
    author ${authorModel}
    content ${contentModel}
  }
 `;

const simpleLibraryMedia = `
  {
    id
    title
    slug
    type
    created_at
    cover {
      url
      caption
    }
  }
 `;

/***
 * Fetches all library media slugs
 */
export async function getLibraryMediasPaths() {
  const query = `{
    libraryMedias {
      slug
    }
  }`;

  const res = await getQuery(query);

  return res.data.libraryMedias;
}

/***
 * Fetches a library media
 * @param slug of the media
 */
export async function getLibraryMedia(slug) {
  const query = `{
    libraryMedias(where: {slug: "${slug}"}, limit: 1) ${completeLibraryMedia}
  }`;

  const res = await getQuery(query);

  return res.data.libraryMedias[0];
}

/***
 * Fetches a library media
 * @param id of the media
 */
export async function getLibraryMediaById(id) {
  const query = `{
    libraryMedia(id: ${id}) ${completeLibraryMedia}
  }`;

  const res = await getQuery(query);

  return res.data.libraryMedia;
}

/***
 * Fetches all library from a specific author
 * @param authorId the is of the author
 */
export async function getLibraryMediasByAuthor(authorId) {
  const query = `{
    libraryMedias(where: {author: ${authorId}}){
    id
    title
    slug
    type
    created_at
    }
  }`;

  const res = await getQuery(query);

  return res.data.libraryMedias;
}

/***
 * Prepares the data from the media form to be send to the api
 * @param formData
 */
export async function prepareMedia(formData) {
  const { content, ...preparedData } = formData;

  // Upload process
  const uploadFile = async (file) => {
    const res = await upload([file], {});

    if (!hasError(res)) {
      return res[0].id;
    } else {
      return res;
    }
  };

  // Escaping quote characters
  preparedData.title = formData.title.split('"').join('\\"');

  /**
   * Cover File
   * File object from the api should contain an id so we don't update them
   */
  if (formData.cover) {
    if (formData.cover.id != null) {
      preparedData.coverID = formData.cover.id;
    } else {
      preparedData.coverID = await uploadFile(formData.cover);
    }
  } else {
    preparedData.coverID = null;
  }

  // Building content bloc queries
  let preparedContent = await Promise.all(
    content.map(async (bloc) => {
      // Building typeName
      const typeName = `ComponentContentType${bloc.type}`;
      switch (bloc.type) {
        case "RichText":
          return `{
          __typename: "${typeName}"
          text: "${bloc.text}"
        }`;

        case "Link":
          return `{
          __typename: "${typeName}"
          url: "${bloc.url}"
          caption: "${bloc.caption}"
        }`;

        case "Image":
          const imageID = bloc.image.id || (await uploadFile(bloc.image));
          return `{
          __typename: "${typeName}"
          image: "${imageID}"
          caption: "${bloc.caption}"
        }`;

        case "File":
          const fileID = bloc.file.id || (await uploadFile(bloc.file));
          return `{
          __typename: "${typeName}"
          file: "${fileID}"
          title: "${bloc.title}"
          description: "${bloc.description}"
        }`;

        default:
          return null;
      }
    })
  );

  preparedData.content = preparedContent.join(" ");

  return preparedData;
}

/***
 * Creates a library media
 * @param body necessary information to create the media
 */
export async function createLibraryMedia(body) {
  const preparedMedia = await prepareMedia(body);

  const mutation = `mutation {
    createLibraryMedia(
      input: {
        data: {
          title: "${preparedMedia.title}"
          type: ${preparedMedia.type}
          library_section: ${preparedMedia.librarySection}
          author: ${preparedMedia.user}
          cover: ${preparedMedia.coverID}
          content: [${preparedMedia.content}]
        }
      }
    ) {
      libraryMedia {
        id
      }
    }
  }
  `;

  const options = createOptionsWithBearer();

  return getQuery(mutation, options);
}

/**
 * Update a library media based on it's id
 * @param {number} id of the media to update
 * @param {object} body containing the updated information
 */
export async function updateLibraryMedia(id, body) {
  const preparedMedia = await prepareMedia(body);

  const mutation = `mutation {
    updateLibraryMedia(
      input: {
        where: { id: ${id} },
        data: {
          title: "${preparedMedia.title}"
          type: ${preparedMedia.type}
          library_section: ${preparedMedia.librarySection}
          author: ${preparedMedia.user}
          cover: ${preparedMedia.coverID}
          content: [${preparedMedia.content}]
        }
      }
    ) {
      libraryMedia {
        id
      }
    }
  }
  `;

  const options = createOptionsWithBearer();

  return getQuery(mutation, options);
}

/***
 * Deletes a library media
 * @param mediaID to delete
 */
export async function deleteLibraryMedia(mediaID) {
  const mutation = `mutation {
    deleteLibraryMedia(input: { where: { id: ${mediaID} } }) {
      libraryMedia {
        id
      }
    }
  }
  `;

  const options = createOptionsWithBearer();

  return getQuery(mutation, options);
}

/**********************************************
 *             LIBRARY SECTIONS               *
 **********************************************/

/***
 * Fetches all library sections slugs
 */
export async function getLibrarySectionsPaths() {
  const query = `{
    librarySections {
      slug
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
 * Fetches all library sections
 */
export async function getAllLibrarySections() {
  const query = `{
    librarySections {
      id
      slug
      title
      description
      library_medias_count
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
      library_medias ${simpleLibraryMedia}
      library_medias_count
    }
  }`;

  const res = await getQuery(query);

  return res.data;
}

/**********************************************
 *                   SEARCH                   *
 **********************************************/

/**
 * Search through the FAQs, Articles & Medias
 * @param {string} query words to look for
 * @param {int} start where to start on the result array
 * @param {int} limit maximum number of answers
 * @param {string} sort keywords to sort the results
 */
export async function search({
  query = "",
  start = 0,
  limit = 10,
  sort = "id:desc",
}) {
  const graphQLQuery = `{
    faqs: searchFaqs(query:"${query}", start: ${start}, limit: ${limit}, sort: "${sort}"){
      id
      question 
      answer
      updated_at
    }
    news: searchArticles(query:"${query}", start: ${start}, limit: ${limit}, sort: "${sort}"){
      id
      slug 
      published_at
      title
      preview
      cover ${imageModel}
    }
    medias: searchMedias(query:"${query}", start: ${start}, limit: ${limit}, sort: "${sort}") ${simpleLibraryMedia}
    users: searchUsers(query:"${query}", start: ${start}, limit: ${limit}, sort: "${sort}"){
      username
      firstName
      lastName
      avatar {
        url
      }
    }
  }`;

  return getQuery(graphQLQuery);
}

/**********************************************
 *                   FEATURES                 *
 **********************************************/

const featureModel = `{
    id
    created_at
    stage
    name
    description
  }`;

/**
 * Get all the features from the API
 */
export async function getAllFeatures() {
  const graphQLQuery = `{
    under_consideration: features(where: { stage: "under_consideration" }) ${featureModel}
    planned: features(where: { stage: "planned" }) ${featureModel}
    in_development: features(where: { stage: "in_development" }) ${featureModel}
    launched: features(where: { stage: "launched" }) ${featureModel}
  }`;

  return getQuery(graphQLQuery);
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
 * Upload a file related to an instance to the community API
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
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  Object.keys(optionalParameters).map((key) => {
    if (typeof optionalParameters[key] !== "undefined") {
      formData.append(key, optionalParameters[key]);
    }
  });

  const options = createOptionsWithBearer();

  return postRaw(API_URL + "/upload", formData, options);
}
