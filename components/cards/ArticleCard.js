import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { API_URL } from "../../services/community";
import Date from "../Date";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  && {
    padding: 0;
  }

  background-image: url(${(props) => props.imgSrc});
  background-position: top;
  background-size: cover;

  display: flex;
  align-items: flex-end;
  justify-content: center;
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

  color: ${(props) => props.theme.primary};
  line-height: 1.5em;
  text-overflow: ellipsis;

  overflow: hidden;
`;

const Preview = styled.p`
  margin-bottom: 0.5rem;

  line-height: 1.5em;
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArticleDate = styled(Date)`
  align-self: flex-end;
  color: ${(props) => props.theme.grey};
`;

export default function ArticleCard(props) {
  return (
    <WrapInLink
      passHref
      href={"/news/[slug]"}
      as={`/news/${props.article.slug}`}
    >
      <Container
        animateOnHover
        imgSrc={API_URL + props.article.cover.url}
        className={props.className}
      >
        <Content>
          <Title>{props.article.title}</Title>
          <Preview>{props.article.preview}</Preview>
          <ArticleDate dateString={props.article.published_at} />
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
};
