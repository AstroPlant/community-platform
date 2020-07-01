import { useField } from "formik";
import React, { useState, useRef } from "react";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: white;
  letter-spacing: 0.025em;
`;

const InputHolder = styled.div`
  position: relative;

  margin-bottom: ${(props) => (props.hasError ? "0.5rem" : "2rem")};
  color: ${(props) => (props.dark ? props.theme.light : props.theme.dark)};
`;

const Input = styled.textarea`
  outline: none;
  resize: none;
  border: ${(props) => (props.hasError ? "2px solid red" : "none")};
  border-radius: 1px;

  width: 100%;

  padding: 0.5rem 0.25rem;

  font: 400 1em ${(props) => props.theme.fontFamily};
  background-color: ${(props) =>
    props.dark ? props.theme.darkLight : props.theme.light};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};

  text-indent: 0.5rem;
`;

const WordCount = styled.p`
  position: absolute;
  z-index: 1;

  right: 1rem;
  bottom: 1rem;

  font-size: 14px;
  font-weight: 450;
`;

export default function LongTextInput({ label, dark, ...props }) {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <Container className={props.className}>
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
      <InputHolder dark={dark} hasError={hasError}>
        <Input dark={dark} {...field} {...props} />
        <WordCount>{props.maxLength - meta.value.length}</WordCount>
      </InputHolder>
      {hasError ? <ErrorMessage errorMessage={meta.error} /> : null}
    </Container>
  );
}

LongTextInput.propTypes = {
  /* The label of the input */
  label: PropTypes.string,
  /* Use the input in darkmode */
  dark: PropTypes.bool,
};

LongTextInput.defaultProps = {
  label: null,
  dark: false,
};
