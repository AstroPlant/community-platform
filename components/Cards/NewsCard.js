import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { API_URL } from "../../services/community";
import Button from "../Button";
import Card from "./Card";

const Container = styled(Card)`
  && {
    padding: 0;
    height: unset;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const Cover = styled.img`
  max-height: 188px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;

  padding: 1.5rem;

  background-color: ${(props) => props.theme.darkLight};
`;

const Title = styled.b`
  height: 1.5em;

  margin-bottom: 0.5rem;

  font-size: 18px;
  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Preview = styled.p`
  margin-bottom: 0.5rem;

  line-height: 1.5em;
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonRow = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;

  width: 100%;
  margin-top: 0.5rem;

  @media screen and (max-width: 464px) {
    grid-template-columns: unset;
  }
`;

const ActionButton = styled(Button)`
  && {
    margin: 0;
    width: 100%;
  }
`;

export default function NewsCard(props) {
  return (
    <Container className={props.className}>
      <Cover src={API_URL + props.featuredArticle.cover.url} />
      <Content>
        <Title>{props.featuredArticle.title}</Title>
        <Preview>{props.featuredArticle.preview}</Preview>
        <ButtonRow>
          <Link
            passHref
            href={"/news/[slug]"}
            as={`/news/${props.featuredArticle.slug}`}
          >
            <ActionButton inverted label={"Read Article"} color={"dark"} />
          </Link>

          <Link passHref href={"/news"}>
            <ActionButton label={"All News"} color={"primary"} />
          </Link>
        </ButtonRow>
      </Content>
    </Container>
  );
}

NewsCard.propTypes = {
  /**
   * Styling class of the container. Used by styled-components.
   */
  className: PropTypes.string,
  /**
   * Object containing the featured article information
   */
  featuredArticle: PropTypes.object.isRequired,
};
