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
  background-position: center;
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
  padding: 1rem;
`;

const CenteredButton = styled(Button)`
  && {
    margin: 1rem auto 0.5rem auto;
  }
`;

export default function NewsCard({ className, article, href, as }) {
  return (
    <Container className={className} imgSrc={API_URL + article.cover.url}>
      <Content>
        <Title>{article.title}</Title>
        <p>{article.short_description}</p>
        <Link passHref href={href} as={as}>
          <CenteredButton label={"Show All"} color={"primary"} />
        </Link>
      </Content>
    </Container>
  );
}

NewsCard.propTypes = {
  className: PropTypes.string,
  article: PropTypes.object.isRequired,
  href: PropTypes.string,
  as: PropTypes.string,
};

NewsCard.defaultProps = {
  href: "/",
  as: null,
};
