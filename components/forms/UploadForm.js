import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Card from "../cards/Card";
import Button from "../Button";
import FileInput from "./FileInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "./ErrorMessage";

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Card)`
  && {
    width: unset;
    height: unset;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const UploadSchema = Yup.object().shape({
  file: Yup.mixed()
    .required("The file must an Image!")
    .test(
      "fileSize",
      "The image size must be under 5 mb",
      (value) => value && value.size <= 5000000
    )
    .test("fileFormat", "Wrong format. Must be .png or .jpeg", (value) => {
      console.log(value);
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
});

export default function UploadForm(props) {
  return (
    <Container>
      <Formik
        initialValues={{
          file: null,
        }}
        initialStatus={{ success: null, error: null }}
        validationSchema={UploadSchema}
        onSubmit={async (values, actions) => {
          console.log(values.file);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <>
            <CustomForm>
              <FileInput
                name={"file"}
                accept="image/*"
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage errorMessage={errors.file} />
              <Row>
                <Button
                  inverted
                  label={"Cancel"}
                  color={"error"}
                  onClick={() => props.closeOverlay()}
                />
                <Button label={"Upload"} color={"primary"} type="submit" />
              </Row>
            </CustomForm>
          </>
        )}
      </Formik>
    </Container>
  );
}

UploadForm.propTypes = {
  closeOverlay: PropTypes.func,
};

UploadForm.defaultProps = {
  closeOverlay: null,
};
