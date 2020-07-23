import { useField } from "formik";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";
import InputLabel from "./InputLabel";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const InputHolder = styled.div`
  position: relative;

  margin-bottom: ${(props) => (props.hasError ? "0.5rem" : "2rem")};

  border: ${(props) => (props.hasError ? "2px solid red" : "")};
  border-radius: 2px;

  background-color: ${(props) =>
    props.dark ? props.theme.darkLight : props.theme.light};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};

  color: ${(props) => (props.dark ? props.theme.light : props.theme.dark)};
`;

const Input = styled.textarea`
  width: 100%;

  padding: 0.5rem 0.75rem 2rem 0.75rem;

  outline: none;
  resize: none;

  overflow: hidden;
  overflow-wrap: break-word;

  background-color: transparent;
  border: none;

  font: 400 1em ${(props) => props.theme.fontFamily};
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
  const disabled = props.disabled;
  return (
    <Container className={props.className}>
      {label && <InputLabel label={label} htmlFor={props.id || props.name} />}
      <InputHolder
        dark={dark}
        disabled={disabled}
        dark={dark}
        hasError={hasError}
      >
        <Input {...field} {...props} />
        {props.maxLength && (
          <WordCount>{props.maxLength - meta.value.length}</WordCount>
        )}
      </InputHolder>
      {hasError ? <ErrorMessage message={meta.error} /> : null}
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
