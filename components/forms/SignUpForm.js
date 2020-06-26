import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { createUser } from "../../services/community";
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
  const router = useRouter();

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
        initialStatus={{ success: "Please enter the following", error: null }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          const res = await createUser(
            values.email,
            values.username,
            values.password
          );
          if (res.status === 200) {
            actions.setStatus({
              success:
                "You're signed up ! Check your emails to confirm your account !",
            });
            actions.resetForm();
          } else {
            actions.setStatus({
              error: "Whoops ! Could not sign you up, check your credentials.",
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

              <SubmitButton
                color={"primary"}
                label={"Sign Up!"}
                type="submit"
              />
            </CustomForm>
          </>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
