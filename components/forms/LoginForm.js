import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { authenticate } from "../../providers/Auth";
import Button from "../Button";
import Checkbox from "./CheckBox";
import TextInput from "./TextInput";

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
  }

  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

const LoginForm = () => {
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
          rememberMe: false,
        }}
        initialStatus={{ success: null, error: null }}
        validate={validate}
        onSubmit={async (values, actions) => {
          const auth = await authenticate(values.username, values.password);

          if (auth) {
            actions.setStatus({ success: "Logged In !" });
            actions.resetForm();
            router.push("/");
          } else {
            actions.setStatus({
              error: "Whoops ! Could not log in, check your credentials.",
            });
          }
        }}
      >
        {({ status, isValid }) => (
          <>
            <CustomForm>
              {status.error && <div>{status.error}</div>}
              {status.success && <div>{status.success}</div>}
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
          </>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
