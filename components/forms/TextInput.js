import { useField } from "formik";
import React from "react";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: white;
  letter-spacing: 0.025em;
`;

const Input = styled.input`
  outline: none;
  border: ${(props) => (props.hasError ? "2px solid red" : "none")};
  border-radius: 1px;

  width: 100%;

  padding: 0.5rem 0.25rem;
  margin-bottom: ${(props) => (props.hasError ? "0.5rem" : "2rem")};

  font: 400 1em ${(props) => props.theme.fontFamily};
  color: ${(props) => (props.dark ? props.theme.light : props.theme.dark)};
  background-color: ${(props) =>
    props.dark ? props.theme.darkLight : props.theme.light};

  text-indent: 0.5rem;
`;

const TextInput = ({ label, dark, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  return (
    <>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Input dark={dark} hasError={hasError} {...field} {...props} />
      {hasError ? <ErrorMessage errorMessage={meta.error} /> : null}
    </>
  );
};

export default TextInput;
