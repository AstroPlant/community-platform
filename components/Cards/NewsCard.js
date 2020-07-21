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
  }

  background-image: url(${(props) => props.imgSrc});
  background-position: top;
  background-size: cover;

  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Title = styled.b`
  height: 1.5em;

  margin-bottom: 0.5rem;

  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
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

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  margin-top: 1rem;
`;

const MarginButton = styled(Button)`
  && {
    margin: 0 1rem;
  }
`;

export default function NewsCard(props) {
  return (
    <Container
      className={props.className}
      imgSrc={API_URL + props.featuredArticle.cover.url}
    >
      <Content>
        <Title>{props.featuredArticle.title}</Title>
        <ButtonRow>
          <Link
            passHref
            href={"/news/[slug]"}
            as={`/news/${props.featuredArticle.slug}`}
          >
            <MarginButton
              inverted={props.home}
              label={"Read Article"}
              color={props.home ? "dark" : "primary"}
            />
          </Link>

          <Link passHref href={"/news"}>
            <MarginButton label={"All News"} color={"primary"} />
          </Link>
        </ButtonRow>
      </Content>
    </Container>
  );
}

NewsCard.propTypes = {
  /* className to customize the component with styled-component */
  className: PropTypes.string,
  /* Article object containing the featured article infos to display */
  featuredArticle: PropTypes.object.isRequired,
};
