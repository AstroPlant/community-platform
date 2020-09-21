import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useSnackBars } from "../../providers/SnackBarProvider";
import { createUser } from "../../services/community";
import { getErrorMessage, hasError } from "../../utils/fetchTools";
import Button from "../Button";
import Checkbox from "../inputs/CheckBox";
import TextInput from "../inputs/TextInput";
import LoadingAnimation from "../LoadingAnimation";

const SubmitButton = styled(Button)`
  margin: 1rem 0 1.5rem 0;

  width: 100%;
`;

const Disclaimer = styled.p`
  font-size: 14px;
  margin-bottom: 1rem;

  a {
    font-weight: bold;
    color: ${(props) => props.theme.primary};
  }
`;

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  username: Yup.string()
    .min(2, "Username must be at least 3 characters!")
    .max(50, "Username is too long.")
    .required("Required"),
  password: Yup.string()
    .min(6, "Your password must be at least 6 characters long.")
    .matches(/[A-Z]/, "password must contain at least one uppercase.")
    .matches(/[0-9]/, "password contain at least one number.")
    .required("Field Required"),
  validatePassword: Yup.string()
    .required("Field Required")
    .oneOf([Yup.ref("password"), ""], "Passwords don't match!"),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions in order to create an account."
  ),
});

export default function SignUpForm() {
  const { addAlert } = useSnackBars();

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          validatePassword: "",
          acceptTerms: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          const res = await createUser(
            values.email,
            values.username,
            values.password
          );

          if (!hasError(res)) {
            addAlert(
              "success",
              "You're all signed up! Check your emails to confirm your account !"
            );
            actions.resetForm();
          } else {
            addAlert(
              "error",
              `Whoops! Could not sign you up, ${getErrorMessage(res)}`
            );
          }
        }}
      >
        {({ isValidating, isSubmitting, isValid }) => (
          <>
            <Form>
              <Disclaimer>
                If you already have an account on{" "}
                <a href="http://astroplant-alpha.surge.sh/">
                  http://astroplant-alpha.surge.sh/
                </a>{" "}
                please use{" "}
                <b>the exact same credentials (email and password)</b> below to
                create your community account. Otherwise you might not be able
                to access your kits data here in the future.
              </Disclaimer>
              <TextInput
                label="email"
                name="email"
                type="email"
                placeholder="SpaceFarmer@astroplant.io"
              />
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
              <TextInput
                label="Validate password"
                name="validatePassword"
                type="password"
                placeholder="Validate Password"
              />

              <Checkbox name="acceptTerms">
                I agree to the <a>terms and conditions</a>
              </Checkbox>

              {isSubmitting ? (
                <LoadingAnimation />
              ) : (
                <SubmitButton
                  type="submit"
                  color={"primary"}
                  label={"Sign Up !"}
                  disabled={isSubmitting || isValidating || !isValid}
                />
              )}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
