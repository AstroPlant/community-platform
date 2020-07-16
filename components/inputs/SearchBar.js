import { Field, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import SearchIcon from "../../public/icons/search.svg";
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

const Input = styled(Field)`
  width: 100%;

  padding-right: 1rem;

  font: 400 1em ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.light};

  background-color: transparent;

  outline: none;
`;

const validateInput = Yup.object().shape({
  search: Yup.string().required(),
});

export default function SearchBar() {
  return (
    <Formik
      initialValues={{
        searchInput: null,
      }}
      validationSchema={validateInput}
      onSubmit={(values) => {
        props.search(values.search);
      }}
    >
      <Form>
        <IconHolder color={"grey"} size={24}>
          <SearchIcon />
        </IconHolder>
        <Input type="text" dark name={"search"} placeholder={"Search"} />
      </Form>
    </Formik>
  );
}

SearchBar.propTypes = {
  /* The function to execute on submit */
  search: PropTypes.func.isRequired,
};
