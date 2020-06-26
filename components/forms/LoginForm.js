import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { authenticate, useAuth } from "../../providers/Auth";
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

const HelpMessage = styled.p`
  margin-bottom: 1rem;
  color: ${(props) => (props.error ? props.theme.error : props.theme.success)};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  rememberMe: Yup.boolean(),
});

const LoginForm = () => {
  const router = useRouter();
  const { setLogged } = useAuth();

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
          rememberMe: false,
        }}
        initialStatus={{ success: null, error: null }}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          const auth = await authenticate(values.username, values.password);

          if (auth) {
            actions.setStatus({ success: "Logged In !" });
            setLogged(true);
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
              {status.error && <HelpMessage error>{status.error}</HelpMessage>}
              {status.success && <HelpMessage>{status.success}</HelpMessage>}
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
              <Row>
                <Checkbox name="rememberMe">Remember Me</Checkbox>
                <a>Password Forgotten ?</a>
              </Row>
              <SubmitButton color={"primary"} label={"Sign In"} type="submit" />
            </CustomForm>
          </>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
