import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import UserInput from "./UserInput";
import SearchIcon from "../public/icons/search.svg";
import Icon from "./Icon";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  background-color: ${(props) => props.theme.darkLight};
`;

export default function SearchBar() {
  return (
    <Container>
      <Icon color={"grey"} size="1.5rem">
        <SearchIcon></SearchIcon>
      </Icon>
      <UserInput dark type={"text"} value={"Search"}></UserInput>
    </Container>
  );
}

SearchBar.propTypes = {};
