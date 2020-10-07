import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import RemoveIcon from "../../public/icons/delete.svg";
import Button from "../Button";
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
  justify-content: space-between;

  padding: 1rem;
  margin-top: 1rem;

  border: 2px solid ${(props) => props.theme.greyDark};
  border-radius: ${(props) => props.theme.radiusMin};

  background-color: ${(props) => props.theme.darkLight};
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
`;

const RemoveButton = styled(Button)`
  && {
    margin: 0;
    padding: 8px;
  }
`;

const FileName = styled.p`
  margin-right: 1rem;
`;

export default function FileInput({
  className,
  id,
  name,
  label,
  initialValues,
  ...props
}) {
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    setSelectedFiles(initialValues);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropRejected,
    onDropAccepted,
    onDrop: props.onDrop,
    accept: props.accept,
    disabled: props.disabled,
    multiple: props.multiple,
    maxSize: props.maxSize,
  });

  function onDropAccepted(files) {
    setSelectedFiles(files);
    setError(null);
  }

  function onDropRejected(fileRejections) {
    setError(fileRejections[0].errors[0].message);
  }

  function removeFile(name) {
    const newFiles = [...selectedFiles];
    setSelectedFiles(newFiles.filter((file) => file.name !== name));
    props.onDrop(newFiles.filter((file) => file.name !== name));
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
      {selectedFiles.length != 0 && (
        <>
          <h4>Files</h4>
          <FileList>
            {selectedFiles.map((file) => {
              if (!file) {
                return null;
              }

              const splitName = file.name.split(".");
              const name = splitName[0];
              const extension =
                splitName[splitName.length - 1] || file.ext.replace(".", "");
              // The files object from the api should contain an id key and give a size in kB
              // whereas file object created locally give a size in Bytes and do not have an id key
              const size = file.id
                ? (file.size / 1000).toFixed(2)
                : (file.size / 1000000).toFixed(2);
              return (
                <ListItem key={name}>
                  <ItemContent>
                    <FileName>{name}</FileName>
                    <Chip label={extension} />
                    <Chip label={`${size} mb`} />
                  </ItemContent>
                  <RemoveButton
                    inverted
                    label={"Remove File"}
                    color="greyDark"
                    icon={<RemoveIcon />}
                    onClick={() => removeFile(file.name)}
                  />
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
  /**
   * Initial values of the selected files
   */
  initialValues: PropTypes.arrayOf(PropTypes.object),
};

FileInput.defaultProps = {
  label: null,
  initialValues: [],
};
