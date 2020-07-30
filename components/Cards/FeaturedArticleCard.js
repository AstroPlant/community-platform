import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { API_URL } from "../../services/community";
import ArticleInfos from "../ArticleInfos";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  height: 50vh;

  padding: 0;
  margin: 2rem 0;

  display: grid;
  grid-template-columns: 0.75fr 1fr;
`;

const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.primary};
`;

const Preview = styled.div`
  margin: 1rem 0;
  max-height: 100%;
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
        <img
          src={API_URL + props.featuredArticle.cover.url}
          alt={
            props.featuredArticle.cover.alternativeText
              ? props.featuredArticle.cover.alternativeText
              : " "
          }
        />
        <InfosContainer>
          <Title>{props.featuredArticle.title}</Title>

          <Preview>
            <ReactMarkdown source={props.featuredArticle.preview} />
          </Preview>
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
