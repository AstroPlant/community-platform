import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { upload } from "../../services/community";
import Button from "../Button";
import ErrorMessage from "../inputs/ErrorMessage";
import FileInput from "../inputs/FileInput";
import LoadingAnimation from "../LoadingAnimation";

const FormTitle = styled.h3`
  margin-bottom: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify};
`;

const ThumbnailHolder = styled.div`
  height: 160px;
  max-width: 192px;

  padding: 0.5rem;
  margin: 1rem;

  border-radius: 8px;
  background-color: ${(props) => props.theme.dark};
`;

const FilePreview = styled.img`
  && {
    object-fit: contain;
  }
`;

export default function UploadForm(props) {
  const [previews, setPreviews] = useState([]);
  const [fileList, setFileList] = useState({});
  const [status, setStatus] = useState({ success: null, error: null });
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(files) {
    if (files.length != 0) {
      let temp = [];
      for (let i = 0; i < files.length; i++) {
        temp.push(URL.createObjectURL(files[i]));
      }

      setFileList(files);
      setPreviews(temp);
      setValid(true);
    } else {
      setValid(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const res = await upload(fileList, props.uploadParameters);

    if (!res.error) {
      setLoading(false);
      setStatus({ success: "File successfully uploaded !", error: null });
      setTimeout(() => {
        reset();
      }, 2000);
    } else {
      setLoading(false);
      setStatus({ success: null, error: res.message[0].messages[0].message });
    }
  }

  function reset() {
    setFileList({});
    setPreviews([]);
    setValid(false);
    setLoading(false);
    setStatus({ success: null, error: null });
    props.closeForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormTitle>{props.title}</FormTitle>
      {previews.length != 0 && (
        <>
          <Row justify={"center"}>
            <b>Previews</b>
          </Row>
          <Row justify={"space-evenly"}>
            {previews &&
              previews.map((preview) => (
                <ThumbnailHolder key={preview}>
                  <FilePreview src={preview} />
                </ThumbnailHolder>
              ))}
          </Row>
        </>
      )}

      <FileInput
        name={"files"}
        accept="image/*"
        multiple={props.multiple}
        maxSize={8000000}
        onDrop={handleChange}
      />
      <Row justify={"flex-end"}>
        <Button
          inverted
          label={"Cancel"}
          color={"error"}
          onClick={() => reset()}
          type="reset"
        />

        {loading ? (
          <LoadingAnimation />
        ) : (
          <Button
            label={"Upload"}
            color={"primary"}
            disabled={!valid}
            type="submit"
          />
        )}
      </Row>
      {status.error && <ErrorMessage message={status.error} />}
      {status.success && <p>{status.success}</p>}
    </form>
  );
}

UploadForm.propTypes = {
  /* Function use to hide the form if used on an overlay */
  closeForm: PropTypes.func,
  /* Additional & optional upload parameters */
  uploadParameters: PropTypes.object,
  /* Whether or not the form should accept multiple file input */
  multiple: PropTypes.bool,
  /* The title of the form */
  title: PropTypes.string.isRequired,
};

UploadForm.defaultProps = {
  closeForm: null,
  multiple: false,
  uploadParameters: {},
};
