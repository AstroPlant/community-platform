import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { useSearch } from "../../providers/Search";
import CloseIcon from "../../public/icons/close.svg";
import SearchIcon from "../../public/icons/search.svg";
import Button from "../Button";
import Icon from "../Icon";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;

  padding: 0.5rem 0.75rem 0.5rem 0.5rem;

  background-color: ${(props) => props.theme.dark};

  border-radius: ${(props) => props.theme.radiusMax};
  overflow: hidden;

  transition: width 0.3s ease;
`;

const Input = styled.input`
  width: 100%;

  padding: 0 1rem 0 0.5rem;

  font: 400 1em ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.light};

  background-color: transparent;

  outline: none;
`;

const SearchButton = styled(Button)`
  max-height: 36px;
  margin: 0;
`;

const ClearButton = styled.button`
  background-color: ${(props) => props.theme.transparent};
`;

const HiddenLabel = styled.label`
  visibility: hidden;
  width: 0;
`;

export default function SearchBar(props) {
  const [query, setQuery] = useState("");
  const { clear, setParams, params } = useSearch();

  const router = useRouter();

  const validQuery = query && query !== "";

  function handleChange(event) {
    setQuery(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (validQuery) {
      setParams({ ...params, query });
      router.push({ pathname: "/search", query: { keywords: query } });
    }
  }

  function handleReset(event) {
    event.preventDefault();
    setQuery("");
    clear();
  }

  return (
    <Form {...props} onSubmit={handleSubmit} id="searchbar">
      <HiddenLabel style={{ width: 0 }} htmlFor={"query"}>
        Search
      </HiddenLabel>
      <Icon color={"grey"} size={28}>
        <SearchIcon />
      </Icon>
      <Input
        type="text"
        id={"query"}
        name={"query"}
        placeholder={"Search"}
        onChange={handleChange}
        value={query}
      />
      {validQuery && (
        <ClearButton aria-label={"Clear"} type="button" onClick={handleReset}>
          <Icon size={24} color={"grey"}>
            <CloseIcon />
          </Icon>
        </ClearButton>
      )}

      <SearchButton inverted type="submit" label="Search" color="secondary" />
    </Form>
  );
}
