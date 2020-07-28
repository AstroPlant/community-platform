import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { createUser } from "../../services/community";
import Button from "../Button";
import Checkbox from "../inputs/CheckBox";
import TextInput from "../inputs/TextInput";
import LoadingAnimation from "../LoadingAnimation";

const SubmitButton = styled(Button)`
  margin: 1rem 0 1.5rem 0;

  width: 100%;
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
    "You must accept the terms and conditon in order to create an account."
  ),
});

const SignUpForm = () => {
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
        initialStatus={{ success: null, error: null }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          const res = await createUser(
            values.email,
            values.username,
            values.password
          );

          if (!res.error) {
            actions.setStatus({
              success:
                "You're all signed up ! Check your emails to confirm your account !",
            });
            actions.resetForm();
          } else {
            actions.setStatus({
              error: `Whoops! Could not sign you up, ${res.message[0].messages[0].message}`,
            });
          }
        }}
      >
        {({ status, isValidating, isSubmitting, isValid }) => (
          <>
            <Form>
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
                I agree to the terms and condtions
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

              {status.error && <ErrorMessage message={status.error} />}
              {status.success && <p>{status.success}</p>}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
