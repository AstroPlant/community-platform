import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { changePassword } from "../../services/community";
import Button from "../Button";
import TextInput from "../inputs/TextInput";

const SubmitButton = styled(Button)`
  margin: 0 0 0 auto;
`;

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .min(6, "Your password must be at least 6 characters long.")
    .matches(/[A-Z]/, "password must contain at least one uppercase.")
    .matches(/[0-9]/, "password contain at least one number.")
    .required("Field Required"),
  validatePassword: Yup.string()
    .required("Field Required")
    .oneOf([Yup.ref("newPassword"), ""], "Passwords don't match!"),
});

export default function ChangePasswordForm() {
  return (
    <>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          validatePassword: "",
        }}
        initialStatus={{ success: null, error: null }}
        validationSchema={ChangePasswordSchema}
        onSubmit={async (values, actions) => {
          const res = await changePassword(
            values.oldPassword,
            values.newPassword
          );

          if (!res.error) {
            // Show feedback
            actions.setStatus({ success: "Password Changed !" });
          } else {
            actions.setStatus({
              error: `Whoops! Could not update your password, ${res.message[0].messages[0].message}`,
            });
          }
        }}
      >
        {({ status, isSubmitting, isValid, isValidating }) => (
          <>
            <Form>
              <TextInput
                label="Current Password"
                name="oldPassword"
                type="password"
                placeholder="Current"
              />

              <TextInput
                label="New password"
                name="newPassword"
                type="password"
                placeholder="New secure password"
              />

              <TextInput
                label="Validate password"
                name="validatePassword"
                type="password"
                placeholder="Validate new password"
              />

              {isSubmitting ? (
                <LoadingAnimation />
              ) : (
                <SubmitButton
                  type="submit"
                  color={"primary"}
                  label={"Change Password"}
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
}
