import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Chip from "../Chip";
import Cover from "../Cover";
import ContentRenderer from "./ContentRenderer";
import PostDetails from "./PostDetails";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 744px;

  padding: 0;

  background-color: ${(props) => props.theme.textBackground};
  border-radius: ${(props) => props.theme.radiusMax};

  @media screen and (max-width: ${Breaks.large}) {
    width: 100%;
    max-width: 744px;
  }
`;

const CoverHolder = styled(Cover)`
  border-radius: ${(props) => props.theme.radiusMax}
    ${(props) => props.theme.radiusMax} 0 0;

  height: 512px;

  @media screen and (max-width: ${Breaks.medium}) {
    height: 256px;
  }
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
        <CoverHolder cover={article.cover} />

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
        <CoverHolder cover={media.cover} />
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
