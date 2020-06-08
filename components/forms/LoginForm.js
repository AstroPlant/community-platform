import { Form, Formik } from "formik";
import React from "react";
import Button from "../Button";
import Checkbox from "./CheckBox";
import TextInput from "./TextInput";
import styled from "styled-components";
import { login } from "../../services/data-api";

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  margin: 1rem 0 1.5rem 0;
`;

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (["admin", "null", "god"].includes(values.username)) {
    errors.username = "Nice try";
  }

  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

async function submit(values) {
  const res = await login(values.username, values.password);
  console.log(res);
}

const LoginForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
          rememberMe: false,
        }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(submit(values));
            setSubmitting(false);
          }, 400);
        }}
      >
        <CustomForm>
          <TextInput
            label="Username"
            name="username"
            type="text"
            placeholder="SpaceFarmer"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />

          <SubmitButton color={"#56F265"} label={"Sign In"} type="submit" />

          <Checkbox name="rememberMe">Remember Me</Checkbox>
        </CustomForm>
      </Formik>
    </>
  );
};

export default LoginForm;
