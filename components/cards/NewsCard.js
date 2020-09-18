import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Button from "../Button";
import Cover from "../Cover";
import Card from "./Card";

const EmptyContainer = styled(Card)`
  align-items: center;
  justify-content: center;
`;

const Container = styled(Card)`
  && {
    padding: 0;
    height: unset;
  }

  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const CoverHolder = styled(Cover)`
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

  @media screen and (max-width: ${Breaks.small}) {
    grid-template-columns: unset;
  }
`;

const ActionButton = styled(Button)`
  && {
    margin: 0;
    width: 100%;
  }
`;

export default function NewsCard({ className, featuredArticle }) {
  if (!featuredArticle) {
    return (
      <EmptyContainer>
        <p>Whoops! Something went wrong...</p>
      </EmptyContainer>
    );
  }

  return (
    <Container className={className}>
      <CoverHolder cover={featuredArticle.cover} />
      <Content>
        <Title>{featuredArticle.title}</Title>
        <Preview>{featuredArticle.preview}</Preview>
        <ButtonRow>
          <Link
            passHref
            href={"/news/[slug]"}
            as={`/news/${featuredArticle.slug}`}
          >
            <ActionButton inverted label={"Read Article"} color={"secondary"} />
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
