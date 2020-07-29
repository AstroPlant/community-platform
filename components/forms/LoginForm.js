import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { authenticate, useAuth } from "../../providers/Auth";
import { forgotPassword, login } from "../../services/community";
import Button from "../Button";
import Checkbox from "../inputs/CheckBox";
import ErrorMessage from "../inputs/ErrorMessage";
import TextInput from "../inputs/TextInput";
import LoadingAnimation from "../LoadingAnimation";

const SubmitButton = styled(Button)`
  margin: 1rem 0 1.5rem 0;

  width: 100%;
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

export default function LoginForm() {
  const router = useRouter();
  const { isLogged, setLogged } = useAuth();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        rememberMe: false,
      }}
      initialStatus={{ success: null, error: null }}
      validationSchema={LoginSchema}
      onSubmit={async (values, actions) => {
        const res = await login(values.username, values.password);

        if (!res.error) {
          // Show feedback
          actions.setStatus({ success: "Logged In !" });

          // Updates local infos
          authenticate(res, values.rememberMe);
          setLogged(true);

          // Navigate to the home page
          if (isLogged) {
            setTimeout(function() {
              actions.resetForm();
              router.replace("/");
            }, 2000);
          }
        } else {
          actions.setStatus({
            error: `Whoops! Could not log in, ${res.message[0].messages[0].message}`,
          });
        }
      }}
    >
      {({ status, isSubmitting, isValid, isValidating }) => (
        <>
          <Form>
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

            {isSubmitting ? (
              <LoadingAnimation />
            ) : (
              <SubmitButton
                type="submit"
                color={"primary"}
                label={"Sign In"}
                disabled={isSubmitting || isValidating || !isValid}
              />
            )}

            {status.error && <ErrorMessage message={status.error} />}
            {status.success && <p>{status.success}</p>}
          </Form>
        </>
      )}
    </Formik>
  );
}
