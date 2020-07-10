import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import InputLabel from "./InputLabel";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const DropZone = styled.div`
  width: 100%;
  border: 2px dashed ${(props) => props.theme.light};
  border-radius: 8px;

  padding: 4rem;
  margin: 0 0 2rem 0;
`;

const FileInput = ({ label, ...props }) => {
  return (
    <Container className={props.className}>
      {label && <InputLabel label={label} htmlFor={props.id || props.name} />}
      <DropZone>
        <h3>Drop your files here</h3>
      </DropZone>
      <input type="file" {...props} />
    </Container>
  );
};

FileInput.propTypes = {
  /* The label of the input */
  label: PropTypes.string,
};

FileInput.defaultProps = {
  label: null,
};

export default FileInput;
