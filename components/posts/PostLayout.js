import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Post from "./Post";
import AuthorCard from "../cards/AuthorCard";
import ArticleCard from "../cards/ArticleCard";

const Layout = styled.div`
  display: flex;
  margin: 2rem auto 0 auto;

  @media screen and (max-width: ${Breaks.large}) {
    flex-direction: column;
  }
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 480px;

  @media screen and (max-width: ${Breaks.large}) {
    max-width: 744px;
  }
`;

const SideColumnTitle = styled.h3`
  margin: 1.5rem 0 0 0;
  height: min-content;
`;

const RelatedPost = styled(ArticleCard)`
  && {
    margin: 1rem 0;
    height: min-content;
  }
`;

export default function PostLayout({ post, type, relatedPosts }) {
  return (
    <Layout>
      {type === "media" && <Post media={post} />}
      {type === "article" && <Post article={post} />}
      <SideColumn>
        <AuthorCard author={post.author} />
        {relatedPosts && (
          <>
            <SideColumnTitle>Related Articles</SideColumnTitle>
            {relatedPosts.map((post) => (
              <RelatedPost key={post.id} showCover={false} article={post} />
            ))}
          </>
        )}
      </SideColumn>
    </Layout>
  );
}

PostLayout.propTypes = {
  /**
   * The post to display
   */
  post: PropTypes.object.isRequired,
  /**
   * Type of the post to display : media or article
   */
  type: PropTypes.string.isRequired,
  /**
   * Post related to the one displayed
   */
  relatedPosts: PropTypes.arrayOf(PropTypes.object),
};

PostLayout.defaultProps = {
  relatedPosts: null,
};
