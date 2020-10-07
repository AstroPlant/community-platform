import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { authenticate, useAuth } from "../../providers/Auth";
import { useSnackBars } from "../../providers/SnackBarProvider";
import { login } from "../../services/community";
import { getErrorMessage, hasError } from "../../utils/fetchTools";
import Button from "../Button";
import Checkbox from "../inputs/CheckBox";
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
  const { isLogged, setLogged } = useAuth();

  const { addAlert } = useSnackBars();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        rememberMe: false,
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, actions) => {
        const res = await login(values.username, values.password);

        if (!hasError(res)) {
          // Show feedback
          addAlert("success", "Logged In ! Redirecting...");

          // Updates local infos
          authenticate(res, values.rememberMe);
          setLogged(true);

          // Navigate to the home page
          if (isLogged) {
            setTimeout(function () {
              actions.resetForm();
            }, 2000);
          }
        } else {
          addAlert(
            "error",
            `Whoops! Could not log in, ${getErrorMessage(res)}`
          );
        }
      }}
    >
      {({ isSubmitting, isValid, isValidating }) => (
        <>
          <Form>
            <TextInput
              label="Username"
              id="username"
              name="username"
              type="text"
              placeholder="SpaceFarmer"
            />
            <TextInput
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <Row>
              <Checkbox id="rememberMe" name="rememberMe">
                Remember Me
              </Checkbox>
              {/* 
              <a
                onClick={async () => {
                  const res = await forgotPassword("test@example.com");
                  alert("Send password reset email !");
                }}
              >
                Password Forgotten ?
              </a> 
              */}
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
          </Form>
        </>
      )}
    </Formik>
  );
}
