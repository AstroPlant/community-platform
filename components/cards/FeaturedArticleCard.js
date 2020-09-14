import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import ArticleInfos from "../ArticleInfos";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  display: grid;
  grid-template-columns: 0.75fr 1fr;

  padding: 0;
  margin: 2rem 0;

  @media screen and (max-width: ${Breaks.large}) {
    display: flex;
    flex-direction: column;

    height: unset;

    margin: 2rem 0 0 0;
  }
`;

const Cover = styled.img`
  height: 512px;

  @media screen and (max-width: ${Breaks.large}) {
    max-height: 224px;
  }
`;

const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.primary};

  @media screen and (max-width: ${Breaks.large}) {
    font-size: 18px;
    line-height: 20px;
    max-height: 20px;
    overflow: hidden;
  }
`;

const Preview = styled.p`
  max-height: 100%;
  margin: 1rem 0;
  overflow: hidden;
`;

const InfosBottom = styled(ArticleInfos)`
  margin-top: auto;
`;

export default function FeaturedArticleCard({ featuredArticle }) {
  // Checking for cover and replacing placeholders
  let cover = {
    url: featuredArticle.cover
      ? process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL + featuredArticle.cover.url
      : "/images/placeholder.jpg",
    alternativeText: featuredArticle.cover
      ? featuredArticle.cover.alternativeText
      : "A plant sprout growing out of the ground.",
  };

  return (
    <WrapInLink href={"/news/[slug]"} as={`/news/${featuredArticle.slug}`}>
      <Container>
        <Cover src={cover.url} alt={cover.alternativeText} />
        <InfosContainer>
          <Title>{featuredArticle.title}</Title>

          <Preview>{featuredArticle.preview}</Preview>
          <InfosBottom
            author={featuredArticle.author}
            date={featuredArticle.published_at}
          />
        </InfosContainer>
      </Container>
    </WrapInLink>
  );
}

FeaturedArticleCard.propTypes = {
  /**
   * Object containing the information of the article to feature
   */
  featuredArticle: PropTypes.object.isRequired,
};
