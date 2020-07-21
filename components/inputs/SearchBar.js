import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { useSearch } from "../../providers/Search";
import SearchIcon from "../../public/icons/search.svg";
import CloseIcon from "../../public/icons/close.svg";
import {
  searchArticles,
  searchFAQs,
  searchLibraryMedias,
} from "../../services/community";
import Icon from "../Icon";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  background-color: ${(props) => props.theme.darkLight};
`;

const IconHolder = styled(Icon)`
  margin: 1rem;
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

export default function SearchBar(props) {
  const [query, setQuery] = useState("");
  const { results, setResults, setParams } = useSearch();
  let search = null;

  switch (props.searchFor) {
    case "libraryMedias":
      search = searchLibraryMedias;
      break;

    case "faqs":
      search = searchFAQs;
      break;

    case "articles":
      search = searchArticles;
      break;

    default:
      break;
  }

  function handleChange(event) {
    setQuery(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (query && query !== "") {
      setParams({ query });
      const res = await search(query);
      setResults(res.data.results);
    }
  }

  function handleReset(event) {
    event.preventDefault();

    document.getElementById("searchbar").reset();

    setQuery(null);
    setParams({});
    setResults(null);
  }

  return (
    <Form onSubmit={handleSubmit} id="searchbar">
      <IconHolder color={"grey"} size={24}>
        <SearchIcon />
      </IconHolder>
      <Input
        type="text"
        name={"query"}
        placeholder={"Search"}
        onChange={handleChange}
      />
      <Hidden type="submit" />
      {query && (
        <div onClick={handleReset}>
          <IconHolder color={"grey"} size={24}>
            <CloseIcon />
          </IconHolder>
        </div>
      )}
    </Form>
  );
}

SearchBar.propTypes = {
  /* The type of content to search */
  searchFor: PropTypes.string.isRequired,
};
