import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { updateUserInfo } from "../../services/community";
import Button from "../Button";
import Checkbox from "./CheckBox";
import TextInput from "./TextInput";
import LongTextInput from "./LongTextInput";

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  margin: 1rem 0 1.5rem 0;
`;

const InputWithMargin = styled(TextInput)`
  margin-right: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
`;

const UserInfoSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  description: Yup.string().max(140),
});

const AccountForm = (props) => {
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
    <>
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
          const update = await updateUserInfo(id, values);

          console.log(update);
        }}
      >
        {({ status, isValid }) => (
          <>
            <CustomForm>
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

              <SubmitButton
                inverted
                color={"secondaryDark"}
                label={"Confirm Change"}
                type="submit"
              />
            </CustomForm>
          </>
        )}
      </Formik>
    </>
  );
};

AccountForm.propTypes = {
  initialInfos: PropTypes.object.isRequired,
};

export default AccountForm;
