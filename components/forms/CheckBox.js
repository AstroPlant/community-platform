import { useField } from "formik";
import React from "react";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";

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
        <ErrorMessage errorMessage={meta.error} />
      ) : null}
    </>
  );
};

export default Checkbox;
