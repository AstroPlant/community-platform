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
  align-items: center;
`;

const UserInfoSchema = Yup.object().shape({});

const AccountForm = (props) => {
  console.log(props);
  return (
    <>
      <Formik
        initialValues={props.initialInfos}
        initialStatus={{ success: null, error: null }}
        validationSchema={UserInfoSchema}
        onSubmit={async (values, actions) => {
          const update = await updateUserInfo();
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
                  placeholder="SpaceFarmer"
                />

                <TextInput
                  addon={"@"}
                  label="Slack Username"
                  name="slackUsername"
                  type="text"
                />
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
                <LongTextInput
                  label="Description"
                  name="description"
                  type="text"
                  maxLength={140}
                />
              </Row>

              <SubmitButton
                color={"primary"}
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
