import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Chip from "../Chip";
import ErrorMessage from "./ErrorMessage";
import InputLabel from "./InputLabel";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const DropZone = styled.div`
  width: 100%;
  min-width: 512px;

  padding: 4rem;
  margin: 0 0 2rem 0;

  border: 2px dashed ${(props) => props.theme.light};
  border-radius: ${(props) => props.theme.radiusMax};

  text-align: center;

  &:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.primary};
  }
`;

const FileList = styled.ul`
  list-style-type: none;
  margin: 0 0 1rem 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;

  padding: 1rem;
  margin-top: 1rem;

  border-radius: ${(props) => props.theme.radiusMin};

  background-color: ${(props) => props.theme.darkLight};
`;

const FileName = styled.p`
  margin-right: 1rem;
`;

export default function FileInput({ className, id, name, label, ...props }) {
  const [error, setError] = useState(null);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDropRejected,
    onDropAccepted,
    onDrop: props.onDrop,
    accept: props.accept,
    disabled: props.disabled,
    multiple: props.multiple,
    maxSize: props.maxSize,
  });

  function onDropAccepted(files) {
    setError(null);
  }

  function onDropRejected(fileRejections) {
    setError(fileRejections[0].errors[0].message);
  }

  return (
    <Container className={className}>
      {label && <InputLabel label={label} htmlFor={id || name} />}
      <DropZone {...getRootProps()}>
        <input {...getInputProps({ type: "file", ...props })} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drop some files here, or click to select files</p>
        )}
      </DropZone>
      {error && <ErrorMessage message={error} />}
      {acceptedFiles.length != 0 && (
        <>
          <h4>Files</h4>
          <FileList>
            {acceptedFiles.map((file) => {
              const splitName = file.name.split(".");
              const name = splitName[0];
              const extension = splitName[1];
              const size = (file.size / 1000000).toFixed(2);
              return (
                <ListItem key={name}>
                  <FileName>{name}</FileName>
                  <Chip label={extension} />
                  <Chip label={`${size} mb`} />
                </ListItem>
              );
            })}
          </FileList>
        </>
      )}
    </Container>
  );
}

FileInput.propTypes = {
  /**
   * The label of the input
   */
  label: PropTypes.string,
  /**
   * The id of the input
   */
  id: PropTypes.string,
  /**
   * The name of the input
   */
  name: PropTypes.string,
  /**
   * Callback function to execute when files are dropped or changed
   */
  onDrop: PropTypes.func.isRequired,
};

FileInput.defaultProps = {
  label: null,
};
