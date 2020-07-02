import { useField } from "formik";
import React from "react";
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
  display: flex;

  font: 400 1em ${(props) => props.theme.fontFamily};

  margin-bottom: ${(props) => (props.hasError ? "0.5rem" : "2rem")};
`;

const Addon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  border-radius: 2px 0 0 2px;

  color: ${(props) => props.theme.light};

  background-color: ${(props) => props.theme.secondaryDark};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};

  padding: 0 0.75rem;
`;

const Input = styled.input`
  outline: none;

  border: ${(props) => (props.hasError ? "2px solid red" : "none")};
  border-radius: 1px;

  width: 100%;

  padding: 0.5rem 0.25rem;

  font: 400 1em ${(props) => props.theme.fontFamily};
  color: ${(props) => (props.dark ? props.theme.light : props.theme.dark)};
  background-color: ${(props) =>
    props.dark ? props.theme.darkLight : props.theme.light};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};

  text-indent: 0.5rem;
`;

const TextInput = ({ label, dark, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  return (
    <Container className={props.className}>
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
      <InputHolder hasError={hasError}>
        {props.addon && (
          <Addon>
            <p>@</p>
          </Addon>
        )}
        <Input dark={dark} {...field} {...props} />
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
