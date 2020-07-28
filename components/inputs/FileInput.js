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

  padding: 4rem;
  margin: 0 0 2rem 0;

  border: 2px dashed ${(props) => props.theme.light};
  border-radius: 8px;

  text-align: center;
`;

export default function FileInput(props) {
  return (
    <Container className={props.className}>
      {props.label && (
        <InputLabel label={props.label} htmlFor={props.id || props.name} />
      )}
      <DropZone>
        <h3>Drop your files here</h3>
      </DropZone>
      <input type="file" {...props} />
    </Container>
  );
}

FileInput.propTypes = {
  /* The label of the input */
  label: PropTypes.string,
};

FileInput.defaultProps = {
  label: null,
};
