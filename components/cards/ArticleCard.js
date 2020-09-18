import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Cover from "../Cover";
import Date from "../Date";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  && {
    padding: 0;
  }

  display: flex;
  flex-direction: column;
`;

const CoverHolder = styled(Cover)`
  height: 256px;

  @media screen and (max-width: ${Breaks.large}) {
    max-height: 180px;
  }

  @media screen and (max-width: ${Breaks.medium}) {
    display: none;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background-color: ${(props) => props.theme.darkLight};
  padding: 1.5rem;
`;

const Title = styled.b`
  height: 1.5em;

  margin-bottom: 0.5rem;

  font-size: 18px;
  line-height: 1.5em;
  text-overflow: ellipsis;

  color: ${(props) => props.theme.primary};
  overflow: hidden;
`;

const Preview = styled.p`
  max-height: 3em;

  margin-bottom: 0.5rem;

  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;

  word-break: break-word;
`;

const ArticleDate = styled(Date)`
  align-self: flex-end;
`;

export default function ArticleCard({ article, showCover, className }) {
  return (
    <WrapInLink passHref href={"/news/[slug]"} as={`/news/${article.slug}`}>
      <Container animateOnHover className={className}>
        {showCover && <CoverHolder cover={article.cover} />}

        <Content>
          <Title>{article.title}</Title>
          <Preview>{article.preview}</Preview>
          <ArticleDate dateString={article.published_at} />
        </Content>
      </Container>
    </WrapInLink>
  );
}

ArticleCard.propTypes = {
  /**
   * Styling class of the container. Used by styled-components.
   */
  className: PropTypes.string,
  /**
   * object containing the article information
   */
  article: PropTypes.object.isRequired,
  /**
   * Whether or not to display the article cover
   */
  showCover: PropTypes.bool,
};

ArticleCard.defaultProps = {
  showCover: true,
};
