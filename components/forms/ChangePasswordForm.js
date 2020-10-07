import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useSnackBars } from "../../providers/SnackBarProvider";
import { changePassword } from "../../services/community";
import { getErrorMessage, hasError } from "../../utils/fetchTools";
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
  const { addAlert } = useSnackBars();

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        validatePassword: "",
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={async (values, actions) => {
        const res = await changePassword(
          values.oldPassword,
          values.newPassword
        );

        if (!hasError(res)) {
          // Show feedback
          addAlert("success", "Password Changed !");
          actions.resetForm();
        } else {
          addAlert(
            "error",
            `Whoops! Could not update your password, ${getErrorMessage(res)}`
          );
        }
      }}
    >
      {({ isSubmitting, isValid, isValidating }) => (
        <>
          <Form>
            <TextInput
              label="Current Password"
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Current"
            />

            <TextInput
              label="New password"
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New secure password"
            />

            <TextInput
              label="Validate password"
              id="validatePassword"
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
          </Form>
        </>
      )}
    </Formik>
  );
}
