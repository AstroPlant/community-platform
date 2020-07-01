import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Card from "./Card";
import Link from "next/link";
import { API_URL } from "../../services/community";

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
  margin-bottom: 0.5rem;
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
        <p>{props.featuredArticle.short_description}</p>
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

          {props.home && (
            <Link passHref href={"/news"}>
              <MarginButton label={"All News"} color={"primary"} />
            </Link>
          )}
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
  /* Wether or not the card is on the homescreen */
  home: PropTypes.bool,
};

NewsCard.defaultProps = {
  home: false,
};
