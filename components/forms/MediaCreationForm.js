import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useAuth } from "../../providers/Auth";
import { useSnackBars } from "../../providers/SnackBarProvider";
import {
  createLibraryMedia,
  updateLibraryMedia,
} from "../../services/community";
import { getErrorMessage, hasError } from "../../utils/fetchTools";
import Button from "../Button";
import Card from "../cards/Card";
import ContentBloc from "../inputs/ContentBloc";
import ContentSelector from "../inputs/ContentSelector";
import FileInput from "../inputs/FileInput";
import InputLabel from "../inputs/InputLabel";
import LongTextInput from "../inputs/LongTextInput";
import MarkdownEditor from "../inputs/MarkdownEditor";
import Select from "../inputs/Select";
import TextInput from "../inputs/TextInput";
import LoadingAnimation from "../LoadingAnimation";

const Container = styled.div`
  max-width: 1024px;

  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
`;

const Bloc = styled(Card)`
  flex-direction: column;
  margin: 0 0 2rem 0;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr;
`;

const ButtonRow = styled(Row)`
  justify-content: flex-end;
`;

const ActionButton = styled(Button)`
  && {
    margin: 0;
  }
`;

/**
 * Generate a simple key for bloc management by react
 * @param {*} type of the bloc
 */
function generateKey(type) {
  return `${type}_${new Date().getTime()}`;
}

/**
 * Validation function for required inputs
 * @param {*} value to be checked
 */
const required = (value) => {
  if (value === "" || !value || value === undefined) {
    return "This field is required.";
  }
};

const urlRegex = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

// Yup validation scheme for medias
const MediaSchema = Yup.object().shape({
  title: Yup.string().required("Please enter a title."),
  type: Yup.string().required("Please choose a media type"),
  librarySection: Yup.number().required(),
  cover: Yup.mixed().nullable(),
  content: Yup.array()
    .min(1, "Please use at least one content bloc")
    .required(),
});

export default function MediaCreationForm({ librarySections, mediaToEdit }) {
  const router = useRouter();
  const { user } = useAuth();
  const { addAlert } = useSnackBars();

  const editionMode = mediaToEdit != null;

  return (
    <Container>
      <Formik
        initialValues={
          editionMode
            ? {
                title: mediaToEdit.title || "",
                type: mediaToEdit.type || "article",
                librarySection: mediaToEdit.librarySection || 1,
                cover: mediaToEdit.cover || null,
                content: mediaToEdit.content || [],
              }
            : {
                title: "",
                type: "article",
                librarySection: 1,
                cover: null,
                content: [],
              }
        }
        validationSchema={MediaSchema}
        onSubmit={async (values) => {
          values.user = user.id;

          const res = editionMode
            ? await updateLibraryMedia(mediaToEdit.id, values)
            : await createLibraryMedia(values);

          if (!hasError(res)) {
            // Show feedback
            addAlert(
              "success",
              `Media successfully ${
                editionMode ? "updated" : "created"
              } ! You'll soon be redirected to the library page.`
            );

            setTimeout(function () {
              router.push("/library");
            }, 1000);
          } else {
            addAlert(
              "error",
              `Whoops! Could not ${
                editionMode ? "update" : "create"
              } media, ${getErrorMessage(res)}`
            );
          }
        }}
      >
        {({ values, isSubmitting, isValid, isValidating, setFieldValue }) => {
          function addBloc(bloc) {
            bloc.id = generateKey(bloc.type);
            setFieldValue("content", [...values.content, bloc]);
          }

          function removeBloc(id) {
            setFieldValue(
              "content",
              values.content.filter((bloc) => bloc.id != id)
            );
          }

          return (
            <Form>
              <Header>
                <PageTitle>
                  {editionMode ? "Edit Media" : "Create Media"}
                </PageTitle>
                <ButtonRow>
                  <ActionButton
                    inverted
                    type="reset"
                    label={"Cancel"}
                    color={"error"}
                  />
                  {isSubmitting ? (
                    <LoadingAnimation />
                  ) : (
                    <ActionButton
                      type="submit"
                      inverted={editionMode}
                      color={editionMode ? "secondary" : "primary"}
                      label={editionMode ? "Update" : "Create"}
                      disabled={isSubmitting || isValidating || !isValid}
                    />
                  )}
                </ButtonRow>
              </Header>

              <Bloc>
                <TextInput
                  label="Media Title"
                  name="title"
                  type="text"
                  placeholder="My Space Media"
                />

                <Row>
                  <Select label="Media Type" name="type">
                    <option value="album">Album</option>
                    <option value="article">Article</option>
                    <option value="files">File(s)</option>
                    <option value="links">Link(s)</option>
                    <option value="tutorial">Tutorial</option>
                  </Select>
                  <Select label="Category" name="librarySection">
                    {librarySections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.title}
                      </option>
                    ))}
                  </Select>
                </Row>

                <FileInput
                  label={"Media Cover"}
                  id="cover"
                  name="cover"
                  accept="image/*"
                  multiple={false}
                  maxSize={8000000}
                  type="file"
                  initialValues={editionMode ? [values.cover] : []}
                  onDrop={(files) => {
                    setFieldValue("cover", files[0]);
                  }}
                />
              </Bloc>

              {values.content.map((bloc, index) => {
                bloc.type = bloc.type.replace("ComponentContentType", "");

                return (
                  <ContentBloc
                    key={bloc.id}
                    bloc={bloc}
                    removeBloc={removeBloc}
                    position={index}
                  >
                    {bloc.type === "Link" && (
                      <>
                        <TextInput
                          label="URL"
                          name={`content[${index}].url`}
                          type="text"
                          placeholder="https://example.com"
                          validate={(value) => {
                            if (!urlRegex.test(value)) {
                              return "Invalid URL";
                            }
                          }}
                        />
                        <TextInput
                          label="Caption"
                          name={`content[${index}].caption`}
                          type="text"
                          placeholder="A nice url."
                        />
                      </>
                    )}
                    {bloc.type === "Image" && (
                      <>
                        <FileInput
                          label={"Image"}
                          id={`content[${index}].image`}
                          name={`content[${index}].image`}
                          accept="image/*"
                          multiple={false}
                          maxSize={8000000}
                          type="file"
                          initialValues={
                            editionMode ? [values.content[index].image] : []
                          }
                          onDrop={(files) => {
                            setFieldValue(`content[${index}].image`, files[0]);
                          }}
                        />

                        <TextInput
                          label="Caption"
                          name={`content[${index}].caption`}
                          type="text"
                          placeholder="A description of the image."
                          validate={required}
                        />
                      </>
                    )}
                    {bloc.type === "File" && (
                      <>
                        <TextInput
                          label="Title"
                          name={`content[${index}].title`}
                          type="text"
                          placeholder="My file title."
                          validate={required}
                        />

                        <LongTextInput
                          label="Description"
                          name={`content[${index}].description`}
                          type="text"
                          placeholder="A description of the file."
                          validate={required}
                          maxLength={140}
                        />

                        <FileInput
                          label={"File"}
                          id={`content[${index}].file`}
                          name={`content[${index}].file`}
                          accept="image/*, audio/*, video/*, .pdf"
                          multiple={false}
                          maxSize={8000000}
                          type="file"
                          initialValues={
                            editionMode ? [values.content[index].file] : []
                          }
                          onDrop={(files) => {
                            setFieldValue(`content[${index}].file`, files[0]);
                          }}
                        />
                      </>
                    )}
                    {bloc.type === "RichText" && (
                      <>
                        <InputLabel
                          htmlFor={`content[${index}].text`}
                          label={"Rich Text Bloc"}
                        />

                        <MarkdownEditor
                          id={`content[${index}].text`}
                          value={editionMode ? values.content[index].text : []}
                          onChange={(value) => {
                            setFieldValue(`content[${index}].text`, value);
                          }}
                        />
                      </>
                    )}
                  </ContentBloc>
                );
              })}

              <ContentSelector
                blocs={[
                  { type: "Link" },
                  { type: "Image" },
                  { type: "RichText" },
                  { type: "File" },
                ]}
                addBloc={addBloc}
              />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

function ContentTypeSelector() {}

MediaCreationForm.propTypes = {
  /**
   * List of all the library sections (names & ids)
   */
  librarySections: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * The media passed in parameter
   */
  mediaToEdit: PropTypes.object,
};

MediaCreationForm.defaultProps = {
  mediaToEdit: null,
};
