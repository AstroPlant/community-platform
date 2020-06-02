import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.hasLabel ? "column" : "row")};
  align-items: flex-start;
  justify-content: flex-start;
`;

const Label = styled.b`
  margin-bottom: 1rem;
  color: white;
`;

const InputContainer = styled.input`
  border-radius: 0;
  outline: none;
  border: none;
  padding: 1rem 0.25rem;
  font: 400 1em ${(props) => props.theme.fontFamily};
  color: ${(props) => (props.dark ? props.theme.light : props.theme.dark)};
  background-color: ${(props) =>
    props.dark ? props.theme.darkLight : props.theme.light};
  width: 100%;
  text-indent: 1rem;
`;

export default function UserInput({ type, label, dark, placeholder }) {
  const hasLabel = label != null;

  return (
    <>
      {hasLabel ? (
        <Container hasLabel={hasLabel}>
          <Label>{label}</Label>
          <InputContainer
            dark={dark}
            type={type}
            placeholder={placeholder}
          ></InputContainer>
        </Container>
      ) : (
        <Container hasLabel={hasLabel}>
          <InputContainer
            dark={dark}
            type={type}
            placeholder={placeholder}
          ></InputContainer>
        </Container>
      )}
    </>
  );
}

UserInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  dark: PropTypes.bool,
  placeholder: PropTypes.string,
};

UserInput.defaultProps = {
  label: null,
  dark: false,
  placeholder: "placeholder",
};
