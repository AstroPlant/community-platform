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

const Addon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 0 0.75rem;

  border-radius: 2px 0 0 2px;

  color: ${(props) => props.theme.light};

  background-color: ${(props) => props.theme.secondaryDark};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};
`;

const Input = styled.input`
  width: 100%;

  padding: 0.5rem 0.75rem;

  font: 400 1em ${(props) => props.theme.fontFamily};

  background-color: transparent;

  outline: none;
`;

const TextInput = ({ label, dark, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  const disabled = props.disabled;

  return (
    <Container className={props.className}>
      {label && <InputLabel label={label} htmlFor={props.id || props.name} />}
      <InputHolder disabled={disabled} dark={dark} hasError={hasError}>
        {props.addon && (
          <Addon>
            <p>@</p>
          </Addon>
        )}
        <Input {...field} {...props} />
      </InputHolder>

      {hasError ? <ErrorMessage errorMessage={meta.error} /> : null}
    </Container>
  );
};

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

export default TextInput;
