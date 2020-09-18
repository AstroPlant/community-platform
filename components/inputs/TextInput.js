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
  border-radius: ${(props) => props.theme.radiusMin};

  background-color: ${(props) =>
    props.dark ? props.theme.darkLight : props.theme.light};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};
`;

const Addon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 0 0.75rem;

  border-radius: 4px 0 0 4px;

  color: ${(props) => props.theme.light};

  background-color: ${(props) => props.theme.secondary};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};
`;

const Input = styled.input`
  width: 100%;

  padding: 0.75rem;

  font: 400 1em ${(props) => props.theme.fontFamily};

  background-color: transparent;

  outline: none;
`;

export default function TextInput({ className, addon, dark, label, ...props }) {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <Container className={className}>
      {label && <InputLabel label={label} htmlFor={props.id || props.name} />}
      <InputHolder disabled={props.disabled} dark={dark} hasError={hasError}>
        {addon && (
          <Addon>
            <p>{addon}</p>
          </Addon>
        )}
        <Input {...field} {...props} />
      </InputHolder>

      {hasError ? <ErrorMessage message={meta.error} /> : null}
    </Container>
  );
}

TextInput.propTypes = {
  /* The label of the input */
  label: PropTypes.string,
  /* The a string to add in front of the input. e.g @ */
  addon: PropTypes.string,
  /* Use the input in darkmode */
  dark: PropTypes.bool,
};

TextInput.defaultProps = {
  addon: null,
  label: null,
  dark: false,
};
