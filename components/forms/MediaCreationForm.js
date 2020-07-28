import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useAuth } from "../../providers/Auth";
import { createLibraryMedia } from "../../services/community";
import Button from "../Button";
import ErrorMessage from "../inputs/ErrorMessage";
import InputLabel from "../inputs/InputLabel";
import Select from "../inputs/Select";
import TextInput from "../inputs/TextInput";
import LoadingAnimation from "../LoadingAnimation";
import MarkdownEditor from "../inputs/MarkdownEditor";

const Container = styled.div`
  padding: 2rem 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const MarginRightInput = styled(Select)`
  margin-right: 1.5rem;
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
      initialStatus={{ success: null, error: null }}
      validationSchema={MediaSchema}
      onSubmit={async (values, actions) => {
        values.user = user.id;

        const res = await createLibraryMedia(values);

        if (!res.error) {
          // Show feedback
          actions.setStatus({ success: "Media created !" });

          setTimeout(function() {
            actions.resetForm();
            router.push("/library");
          }, 1000);
        } else {
          actions.setStatus({
            error: `Whoops! Could not create media, ${res.message[0].messages[0].message}`,
          });
        }
      }}
    >
      {({
        values,
        status,
        isSubmitting,
        isValid,
        isValidating,
        setFieldValue,
      }) => (
        <Container>
          <Form>
            <Row>
              <MarginRightInput label="Media Type" name="type">
                <option>Article</option>
                <option>File</option>
                <option>Link</option>
              </MarginRightInput>
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

                <Col>
                  <InputLabel htmlFor="articleCover" label={"Article Cover"} />

                  <input
                    id="articleCover"
                    name="articleCover"
                    type="file"
                    onChange={(event) => {
                      setFieldValue(
                        "articleCover",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                </Col>

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
              <Col>
                <InputLabel htmlFor="file" label={"File to upload"} />

                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
              </Col>
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
              <Button inverted type="reset" label={"Cancel"} color={"error"} />
              {isSubmitting ? (
                <LoadingAnimation />
              ) : (
                <Button
                  type="submit"
                  color={"primary"}
                  label={"Create"}
                  disabled={isSubmitting || isValidating || !isValid}
                />
              )}
            </ButtonRow>

            {status.error && <ErrorMessage message={status.error} />}
            {status.success && <p>{status.success}</p>}
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