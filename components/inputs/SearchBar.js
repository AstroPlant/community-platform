import { Field, Formik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import SearchIcon from "../../public/icons/search.svg";
import Icon from "../Icon";
import { searchFAQs } from "../../services/community";

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

  function handleChange(event) {
    setQuery(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const results = await props.search(query);
    console.log(results);
  }

  return (
    <Form onSubmit={handleSubmit}>
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
    </Form>
  );
}

SearchBar.propTypes = {
  /* The function to execute on submit */
  search: PropTypes.func.isRequired,
};
