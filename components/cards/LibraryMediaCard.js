import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

export default function LibraryMediaCard(props) {
  return (
    <Container className={props.className}>
      <b>{props.media.title}</b>
    </Container>
  );
}

LibraryMediaCard.propTypes = {
  media: PropTypes.object.isRequired,
};
