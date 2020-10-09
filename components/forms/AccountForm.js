import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useSnackBars } from "../../providers/SnackBarProvider";
import { updateUserInfo } from "../../services/community";
import Breaks from "../../utils/breakpoints";
import { getErrorMessage, hasError } from "../../utils/fetchTools";
import Button from "../Button";
import LongTextInput from "../inputs/LongTextInput";
import TextInput from "../inputs/TextInput";
import LoadingAnimation from "../LoadingAnimation";

const Row = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: ${Breaks.large}) {
    grid-template-columns: unset;
    grid-gap: 0;
  }
`;

const SubmitButton = styled(Button)`
  margin: 0 0 0 auto;
`;

const UserInfoSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  description: Yup.string().max(140),
});

export default function AccountForm(props) {
  let {
    id,
    email,
    username,
    slackUsername,
    firstName,
    lastName,
    description,
  } = props.initialInfos;

  const { addAlert } = useSnackBars();

  return (
    <Formik
      initialValues={{
        username: username,
        email: email,
        slackUsername: slackUsername || "",
        firstName: firstName || "",
        lastName: lastName || "",
        description: description || "",
      }}
      validationSchema={UserInfoSchema}
      onSubmit={async (values) => {
        const res = await updateUserInfo(id, values);

        if (!hasError(res)) {
          addAlert("success", "Your account information has been updated.");
        } else {
          addAlert(
            "error",
            `Whoops! Something went wrong! ${getErrorMessage(res)}`
          );
        }
      }}
    >
      {({ isValidating, isSubmitting, isValid }) => (
        <>
          <Form>
            <Row>
              <TextInput
                disabled
                label="Username"
                id="username"
                name="username"
                type="text"
              />

              <TextInput label="Email" id="email" name="email" type="email" />
            </Row>

            <Row>
              <TextInput
                label="First Name"
                id="firstName"
                name="firstName"
                type="text"
              />
              <TextInput
                label="Last Name"
                id="lastName"
                name="lastName"
                type="text"
              />
            </Row>

            <Row>
              <TextInput
                addon={"@"}
                label="Slack username"
                id="slackUsername"
                name="slackUsername"
                type="text"
              />

              <LongTextInput
                label="Description"
                id="description"
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
                color={"secondary"}
                label={"Confirm Change"}
                type="submit"
                disabled={isSubmitting || isValidating || !isValid}
              />
            )}
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
