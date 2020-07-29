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

export default function Select({ className, ...props }) {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  const disabled = props.disabled;

  return (
    <Container className={className}>
      {props.label && (
        <InputLabel label={props.label} htmlFor={props.id || props.name} />
      )}
      <InputHolder disabled={disabled} dark={props.dark} hasError={hasError}>
        <SelectInput {...field} {...props} />
      </InputHolder>

      {hasError ? <ErrorMessage message={meta.error} /> : null}
    </Container>
  );
}

Select.propTypes = {
  /* Styling class of the container. Used by styled-components. */
  className: PropTypes.string,
  /* The label of the input */
  label: PropTypes.string,
  /* Whether or not to use the input in darkmode */
  dark: PropTypes.bool,
};

Select.defaultProps = {
  label: null,
  dark: false,
};
