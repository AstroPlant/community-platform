import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Date from "../Date";
import WrapInLink from "../WrapInLink";
import Card from "./Card";
import { API_URL } from "../../services/community";

const Container = styled(Card)`
  padding: 0;

  display: grid;
  grid-template-columns: 0.6fr 1fr;
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
  return (
    <WrapInLink href={href} as={as}>
      <Container>
        <img src={API_URL + featuredArticle.cover.url}></img>
        <InfosContainer>
          <Row>
            <Row>
              <InfoName>Date:</InfoName>
              <BoldDate dateString={featuredArticle.created_at} />
            </Row>
            <AuthorRow>
              <InfoName>Author:</InfoName>
              <b>{featuredArticle.author.username}</b>
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
