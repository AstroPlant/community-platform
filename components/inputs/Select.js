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
  display: flex;

  margin-bottom: ${(props) => (props.hasError ? "0.5rem" : "2rem")};

  color: ${(props) => (props.dark ? props.theme.light : props.theme.dark)};

  border: ${(props) => (props.hasError ? "2px solid red" : "none")};
  border-radius: 2px;

  background-color: ${(props) =>
    props.dark ? props.theme.darkLight : props.theme.light};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};
`;

const SelectInput = styled.select`
  width: 100%;

  margin: 0 0.5rem;
  padding: 0.75rem 0.5rem;

  font: 400 1em ${(props) => props.theme.fontFamily};

  background-color: transparent;

  outline: none;
  border: 0;
`;

export default function Select(props) {
  const { className, ...otherProps } = props;

  const [field, meta] = useField(otherProps);
  const hasError = meta.touched && meta.error;
  const disabled = otherProps.disabled;

  return (
    <Container className={className}>
      {otherProps.label && (
        <InputLabel
          label={otherProps.label}
          htmlFor={otherProps.id || otherProps.name}
        />
      )}
      <InputHolder
        disabled={disabled}
        dark={otherProps.dark}
        hasError={hasError}
      >
        <SelectInput {...field} {...otherProps} />
      </InputHolder>

      {hasError ? <ErrorMessage message={meta.error} /> : null}
    </Container>
  );
}

Select.propTypes = {
  /* The label of the input */
  label: PropTypes.string,
  /* Use the input in darkmode */
  dark: PropTypes.bool,
};

Select.defaultProps = {
  addon: null,
  label: null,
  dark: false,
};
