import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../public/icons/close.svg";
import SearchIcon from "../../public/icons/search.svg";
import Icon from "../Icon";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: ${(props) => (props.collapsed ? "40px" : "100%")};

  margin: 0 0.5rem;
  background-color: ${(props) => props.theme.dark};

  overflow: hidden;

  transition: width 0.3s ease;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
`;

const Input = styled.input`
  width: 100%;

  padding-right: 1rem;

  font: 400 1em ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.light};

  background-color: transparent;

  outline: none;
`;

const Hidden = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
`;

export default function SearchBar({ collapsible, ...props }) {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState(true);

  const router = useRouter();

  function handleChange(event) {
    setQuery(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (query && query !== "") {
      router.push({ pathname: "/search", query: { keywords: query } });
    }
  }

  function handleReset(event) {
    event.preventDefault();

    document.getElementById("searchbar").reset();

    setQuery(null);
  }

  return (
    <Container collapsed={collapsible && collapsed} {...props}>
      <Form
        onSubmit={handleSubmit}
        onClick={() => setCollapsed(false)}
        id="searchbar"
      >
        <Icon color={"grey"} size={24}>
          <SearchIcon />
        </Icon>
        <Input
          type="text"
          name={"query"}
          placeholder={"Search"}
          onChange={handleChange}
        />
        <Hidden type="submit" />
      </Form>
      <Icon
        color={"grey"}
        size={24}
        onClick={(event) => {
          setCollapsed(true);
          handleReset(event);
        }}
      >
        <CloseIcon />
      </Icon>
    </Container>
  );
}

SearchBar.propTypes = {
  /**
   * Whether or not the search bar can collapse
   */
  collapsible: PropTypes.bool,
};

SearchBar.defaultProps = {
  collapsible: false,
};
