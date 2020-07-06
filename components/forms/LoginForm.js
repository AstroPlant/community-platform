import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { authenticate, useAuth } from "../../providers/Auth";
import Button from "../Button";
import Checkbox from "./CheckBox";
import TextInput from "./TextInput";
import { forgotPassword } from "../../services/community";
import LoadingAnimation from "../LoadingAnimation";

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
  const [loading, setLoading] = useState(false);
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
          setLoading(true);
          const auth = await authenticate(
            values.username,
            values.password,
            values.rememberMe
          );

          if (auth) {
            setLoading(false);

            actions.setStatus({ success: "Logged In !" });
            setLogged(true);

            router.replace("/");
          } else {
            setLoading(false);

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
                <a
                  onClick={async () => {
                    const res = await forgotPassword("test@example.com");
                    alert("Send password reset email !");
                  }}
                >
                  Password Forgotten ?
                </a>
              </Row>
              {loading ? (
                <LoadingAnimation />
              ) : (
                <SubmitButton
                  color={"primary"}
                  label={"Sign In"}
                  type="submit"
                />
              )}
            </CustomForm>
          </>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
