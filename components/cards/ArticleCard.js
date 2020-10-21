import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Arrow from "../../public/icons/long-arrow.svg";
import Breaks from "../../utils/breakpoints";
import Cover from "../Cover";
import Date from "../Date";
import Icon from "../Icon";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const AnimatedArrow = styled(Icon)`
  && {
    margin: 0;
  }
`;

const Container = styled(Card)`
  && {
    padding: 0;
  }

  flex-direction: column;

  &:hover ${AnimatedArrow} {
    animation: cta-arrow 1s ease-in-out infinite;
  }
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

const DetailsHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background-color: ${(props) => props.theme.textBackground};
  padding: 1rem 1.25rem;
`;

const Title = styled.b`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  margin-bottom: 1rem;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const Preview = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  height: 3em;

  margin-bottom: 0.5rem;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const ArticleDate = styled(Date)`
  font-size: 14px;
  margin-bottom: 0.5rem;
`;

const ReadRow = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  margin-top: 0.25rem;
`;

const ReadLabel = styled.label`
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;

  margin-right: auto;

  letter-spacing: 0.1em;
  color: ${(props) => props.theme.secondary};
`;

export default function ArticleCard({ article, className, showCover }) {
  return (
    <WrapInLink href={"/news/[slug]"} as={`/news/${article.slug}`}>
      <Container className={className} animateOnHover>
        {showCover && <CoverHolder cover={article.cover} />}

        <DetailsHolder>
          <ArticleDate dateString={article.published_at} />

          <Title>{article.title}</Title>
          <Preview>{article.preview}</Preview>
          {showCover && (
            <ReadRow>
              <ReadLabel>Read</ReadLabel>
              <AnimatedArrow size={32} color={"secondary"}>
                <Arrow />
              </AnimatedArrow>
            </ReadRow>
          )}
        </DetailsHolder>
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
