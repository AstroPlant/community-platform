import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Cover from "../Cover";
import Date from "../Date";
import UserPreview from "../UserPreview";
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

const CoverHolder = styled(Cover)`
  && {
    border-bottom: 0;
    border-right: 1px solid ${(props) => props.theme.primary};
  }

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
  margin: 0.5rem 0 0 0;
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
  margin: 1.5rem 0;
  overflow: hidden;
`;

const UserDetails = styled(UserPreview)`
  margin-top: auto;
`;

export default function FeaturedArticleCard({ featuredArticle }) {
  return (
    <WrapInLink href={"/news/[slug]"} as={`/news/${featuredArticle.slug}`}>
      <Container>
        <CoverHolder cover={featuredArticle.cover} />
        <InfosContainer>
          <Date dateString={featuredArticle.published_at} />
          <Title>{featuredArticle.title}</Title>

          <Preview>{featuredArticle.preview}</Preview>
          <UserDetails user={featuredArticle.author} />
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
