import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { API_URL } from "../../services/community";
import Date from "../Date";
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
  margin: 1rem 0;
`;

const Row = styled.div`
  display: flex;
`;

const BoldDate = styled(Date)`
  font-weight: bold;
`;

const AuthorRow = styled.div`
  display: flex;
  margin-left: 2rem;
`;

const InfoName = styled.p`
  font-weight: 300;
  margin-right: 1rem;
`;

export default function FeaturedArticleCard({ featuredArticle, href, as }) {
  const hasFullName =
    featuredArticle.author.firstName && featuredArticle.author.lastName;

  return (
    <WrapInLink href={href} as={as}>
      <Container>
        <img
          src={API_URL + featuredArticle.cover.url}
          alt={
            featuredArticle.cover.alternativeText
              ? featuredArticle.cover.alternativeText
              : " "
          }
        />
        <InfosContainer>
          <Row>
            <Row>
              <InfoName>Date:</InfoName>
              <BoldDate dateString={featuredArticle.created_at} />
            </Row>
            <AuthorRow>
              <InfoName>Author:</InfoName>
              <b>
                {hasFullName
                  ? `${featuredArticle.author.firstName} ${featuredArticle.author.lastName}`
                  : featuredArticle.author.username}
              </b>
            </AuthorRow>
          </Row>
          <Title>{featuredArticle.title}</Title>
          <p>{featuredArticle.short_description}</p>
        </InfosContainer>
      </Container>
    </WrapInLink>
  );
}

FeaturedArticleCard.propTypes = {
  featuredArticle: PropTypes.object.isRequired,
};
