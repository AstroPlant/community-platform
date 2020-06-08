import { useField } from "formik";
import React from "react";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  transform: scale(1.25);
  padding: 10px;
  margin-right: 1rem;
`;

const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <Row>
        <Input type="checkbox" {...field} {...props} />
        <label>{children}</label>
      </Row>

      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

export default Checkbox;
