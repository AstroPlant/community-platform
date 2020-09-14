import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useAuth } from "../../providers/Auth";
import { useSnackBars } from "../../providers/SnackBarProvider";
import { createLibraryMedia } from "../../services/community";
import { getErrorMessage, hasError } from "../../utils/fetchTools";
import Button from "../Button";
import FileInput from "../inputs/FileInput";
import InputLabel from "../inputs/InputLabel";
import MarkdownEditor from "../inputs/MarkdownEditor";
import Select from "../inputs/Select";
import TextInput from "../inputs/TextInput";
import LoadingAnimation from "../LoadingAnimation";

const Container = styled.div`
  max-width: 1440px;

  width: 100%;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const MarkdownContainer = styled(Col)`
  margin: 2rem 0;
`;

const Separator = styled.div`
  display: block;

  height: 2px;
  width: 75%;

  margin: 0 auto 2rem auto;

  background-color: ${(props) => props.theme.primary};
`;

const ButtonRow = styled(Row)`
  justify-content: flex-end;
`;

const WideButton = styled(Button)`
  && {
    margin: 0;
    padding: 0.75rem 1rem;
  }
`;

const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const MediaSchema = Yup.object().shape({
  title: Yup.string().required("Please enter a title."),
  type: Yup.string().required("Please choose a media type"),
  librarySection: Yup.number().required(),
  url: Yup.string().matches(urlRegex, "This url is not valid."),
  file: Yup.mixed().nullable(),
  articleTitle: Yup.string(),
  articleCover: Yup.mixed(),
  articleContent: Yup.string(),
});

export default function MediaCreationForm(props) {
  const router = useRouter();
  const { user } = useAuth();
  const [value, setValue] = useState("");

  const { addAlert } = useSnackBars();

  return (
    <Formik
      initialValues={{
        type: "Article",
        title: "",
        librarySection: 1,
        articleTitle: "",
        articleCover: null,
        articleContent: "",
        file: null,
        url: "",
      }}
      validationSchema={MediaSchema}
      onSubmit={async (values) => {
        values.user = user.id;

        const res = await createLibraryMedia(values);

        if (!hasError(res)) {
          // Show feedback
          addAlert(
            "success",
            "Media created ! You'll soon be redirected to the page."
          );

          setTimeout(function() {
            router.push("/library");
          }, 1000);
        } else {
          addAlert(
            "error",
            `Whoops! Could not create media, ${getErrorMessage(res)}`
          );
        }
      }}
    >
      {({ values, isSubmitting, isValid, isValidating, setFieldValue }) => (
        <Container>
          <PageTitle>Create Media</PageTitle>
          <Form>
            <Row>
              <Select label="Media Type" name="type">
                <option>Article</option>
                <option>File</option>
                <option>Link</option>
              </Select>
              <Select label="Category" name="librarySection">
                {props.librarySections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.title}
                  </option>
                ))}
              </Select>
            </Row>

            <TextInput
              label="Media Title"
              name="title"
              type="text"
              placeholder="My Space Media"
            />

            <Separator />

            {values.type === "Article" && (
              <div>
                <TextInput
                  label="Article Title"
                  name="articleTitle"
                  type="text"
                  placeholder="A Plant in Space"
                />

                <FileInput
                  label={"Article Cover"}
                  id="articleCover"
                  name="articleCover"
                  accept="image/*"
                  multiple={false}
                  maxSize={8000000}
                  type="file"
                  onDrop={(files) => {
                    setFieldValue("articleCover", files[0]);
                  }}
                />

                <MarkdownContainer>
                  <InputLabel
                    htmlFor="articleContent"
                    label={"Article Content"}
                  />

                  <MarkdownEditor
                    id="articleContent"
                    value={value}
                    onChange={(value) => {
                      setValue(value);
                      setFieldValue("articleContent", value);
                    }}
                  />
                </MarkdownContainer>
              </div>
            )}

            {values.type === "File" && (
              <FileInput
                label={"File to upload"}
                id="file"
                accept="image/*, audio/*, video/*, .pdf"
                name="file"
                type="file"
                multiple={false}
                maxSize={20000000}
                onDrop={(files) => {
                  setFieldValue("file", files[0]);
                }}
              />
            )}

            {values.type === "Link" && (
              <TextInput
                label="url"
                name="url"
                type="text"
                addon="https://"
                placeholder="example.com"
              />
            )}

            <ButtonRow>
              <WideButton
                inverted
                type="reset"
                label={"Cancel"}
                color={"error"}
              />
              {isSubmitting ? (
                <LoadingAnimation />
              ) : (
                <WideButton
                  type="submit"
                  color={"primary"}
                  label={"Create"}
                  disabled={isSubmitting || isValidating || !isValid}
                />
              )}
            </ButtonRow>
          </Form>
        </Container>
      )}
    </Formik>
  );
}

MediaCreationForm.propTypes = {
  /* List of all the library sections (names & ids) */
  librarySections: PropTypes.arrayOf(PropTypes.object).isRequired,
};
