import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Chip from "../Chip";
import ContentRenderer from "./ContentRenderer";
import PostCover from "./PostCover";
import PostDetails from "./PostDetails";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  max-width: 744px;

  margin: 0 2rem 0 auto;
  padding: 0;

  background-color: ${(props) => props.theme.darkLight};
  border-radius: ${(props) => props.theme.radiusMax};
`;

const ContentHolder = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Title = styled.h1`
  margin: 2rem 0;
  line-height: 1.2;
`;

const Topics = styled.div`
  display: flex;
`;

export default function Post({ article, media }) {
  if (article) {
    return (
      <Container>
        <PostCover cover={article.cover} />

        <ContentHolder>
          <Topics>
            {article.categories &&
              article.categories.map((category) => (
                <Chip key={category.id} label={category.title} />
              ))}
          </Topics>

          <Title>{article.title}</Title>
          <PostDetails author={article.author} date={article.published_at} />

          <ContentRenderer content={article.content} />
        </ContentHolder>
      </Container>
    );
  }

  if (media) {
    return (
      <Container>
        <PostCover cover={media.cover} />
        <ContentHolder>
          <Title>{media.title}</Title>
          <PostDetails author={media.author} date={media.created_at} />
          <ContentRenderer content={media.content} />
        </ContentHolder>
      </Container>
    );
  }
}

Post.propTypes = {
  /**
   * Object containing an article information
   */
  article: PropTypes.object,
  /**
   * Object containing a media information
   */
  media: PropTypes.object,
};

Post.defaultProps = {
  article: null,
  media: null,
};
