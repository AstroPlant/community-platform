import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

const TitleRow = styled.div`
  flex: 1;
`;

const LibrairiesContainer = styled.div`
  flex: 10;
  width: 100%;
  margin: 1rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonRow = styled.div`
  flex: 1;
`;

const LibrairyPlaceholder = styled.div`
  display: block;
  height: 100px;
  width: 75px;
  background-color: white;
`;

const ShowAllButton = styled(Button)`
  && {
    margin: auto;
  }
`;

export default function LibraryCard({ className }) {
  return (
    <Container className={className}>
      <TitleRow>
        <h3>AstroPlant Library</h3>
      </TitleRow>
      <LibrairiesContainer>
        <LibrairyPlaceholder />
        <LibrairyPlaceholder />
        <LibrairyPlaceholder />
      </LibrairiesContainer>
      <ButtonRow>
        <ShowAllButton label={"Show All"} color={"#56F265"}></ShowAllButton>
      </ButtonRow>
    </Container>
  );
}

LibraryCard.propTypes = {
  className: PropTypes.string,
  iconSize: PropTypes.string,
  iconSVG: PropTypes.node,
  text: PropTypes.string,
};
