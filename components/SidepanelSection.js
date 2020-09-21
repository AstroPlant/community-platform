import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import ArrowIcon from "../public/icons/arrow-down.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;

  background-color: ${(props) => props.theme.darkLight};
`;

const Title = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  background-color: ${(props) => props.theme.darkLight};
`;

const ItemsContainer = styled.div`
  display: grid;
  grid-gap: 1.5rem;

  height: ${(props) => (props.open ? "auto" : "0")};
  width: 100%;

  margin-bottom: ${(props) => (props.open ? "1.5rem" : "0")};

  visibility: ${(props) => (props.open ? "visible" : "hidden")};
`;

export default function SidepanelSection(props) {
  const [open, setOpen] = useState(true);

  return (
    <Container>
      <TitleContainer>
        <Title>{props.title}</Title>
        <Dropdown
          reverse={open}
          onClick={() => setOpen(!open)}
          icon={<ArrowIcon />}
        />
      </TitleContainer>
      <ItemsContainer open={open}>{props.children}</ItemsContainer>
    </Container>
  );
}

SidepanelSection.propTypes = {
  /**
   * Title of the section
   */
  title: PropTypes.string.isRequired,
  /**
   * Content of the section
   */
  children: PropTypes.node.isRequired,
};
