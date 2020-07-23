import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { updateUserInfo } from "../../services/community";
import Button from "../Button";
import LongTextInput from "../inputs/LongTextInput";
import TextInput from "../inputs/TextInput";

const InputWithMargin = styled(TextInput)`
  margin-right: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
`;

const SubmitButton = styled(Button)`
  margin: 0 0 0 auto;
`;

const UserInfoSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  description: Yup.string().max(140),
});

function AccountForm(props) {
  let {
    id,
    email,
    username,
    slackUsername,
    firstName,
    lastName,
    description,
  } = props.initialInfos;

  return (
    <Formik
      initialValues={{
        username: username,
        email: email,
        slackUsername: slackUsername,
        firstName: firstName,
        lastName: lastName,
        description: description,
      }}
      initialStatus={{ success: null, error: null }}
      validationSchema={UserInfoSchema}
      onSubmit={async (values, actions) => {
        const res = await updateUserInfo(id, values);

        if (!res.error) {
          // Show feedback
          actions.setStatus({ success: "Information successfly updated!" });
        } else {
          // Show Error
          actions.setStatus({
            error: `Whoops! Something went wrong! ${res.message[0].messages[0].message}`,
          });
        }
      }}
    >
      {({ status, isValidating, isSubmitting, isValid }) => (
        <>
          <Form>
            <Row>
              <InputWithMargin
                disabled
                label="Username"
                name="username"
                type="text"
              />

              <TextInput label="Email" name="email" type="email" />
            </Row>

            <Row>
              <InputWithMargin
                label="First Name"
                name="firstName"
                type="text"
              />
              <TextInput label="Last Name" name="lastName" type="text" />
            </Row>

            <Row>
              <InputWithMargin
                addon={"@"}
                label="Slack username"
                name="slackUsername"
                type="text"
              />

              <LongTextInput
                label="Description"
                name="description"
                type="text"
                maxLength={140}
              />
            </Row>

            {isSubmitting ? (
              <LoadingAnimation />
            ) : (
              <SubmitButton
                inverted
                color={"secondaryDark"}
                label={"Confirm Change"}
                type="submit"
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

AccountForm.propTypes = {
  /* User information on page load */
  initialInfos: PropTypes.object.isRequired,
};

export default AccountForm;
