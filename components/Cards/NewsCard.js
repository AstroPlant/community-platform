import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Card from "./Card";

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

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background-color: ${(props) => props.theme.darkLight};
  padding: 1rem;
`;

const ShowAllButton = styled(Button)`
  && {
    margin: auto;
  }
`;

export default function NewsCard({ className, title, description, imgSrc }) {
  return (
    <Container className={className} imgSrc={imgSrc}>
      <Content>
        <b>{title}</b>
        <p>{description}</p>
        <ShowAllButton label={"Show All"} color={"#56F265"}></ShowAllButton>
      </Content>
    </Container>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imgSrc: PropTypes.string,
};
