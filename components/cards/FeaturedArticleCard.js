import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { API_URL } from "../../services/community";
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
  height: 50vh;

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

export default function FeaturedArticleCard(props) {
  return (
    <WrapInLink
      href={"/news/[slug]"}
      as={`/news/${props.featuredArticle.slug}`}
    >
      <Container>
        <Cover
          src={API_URL + props.featuredArticle.cover.url}
          alt={
            props.featuredArticle.cover.alternativeText
              ? props.featuredArticle.cover.alternativeText
              : "The article cover"
          }
        />
        <InfosContainer>
          <Title>{props.featuredArticle.title}</Title>

          <Preview>{props.featuredArticle.preview}</Preview>
          <InfosBottom
            author={props.featuredArticle.author}
            date={props.featuredArticle.published_at}
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
