import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import WrapInLink from "./WrapInLink";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.light};

  width: ${(props) => props.size + "rem"};
  height: ${(props) => props.size + "rem"};

  overflow: hidden;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-weight: bold;
  font-size: ${(props) => props.fontSize + "em"};
`;

export default function Avatar({ hasPicture, imgSrc, username, size }) {
  const initial = username.charAt(0).toUpperCase();
  const fontSize = size / 2;
  return (
    <WrapInLink href={"/"} as={"/"}>
      <Container size={size}>
        {hasPicture ? (
          <img src={imgSrc} />
        ) : (
          <Placeholder fontSize={fontSize}>{initial}</Placeholder>
        )}
      </Container>
    </WrapInLink>
  );
}

Avatar.propTypes = {
  hasPicture: PropTypes.bool,
  imgSrc: PropTypes.string,
  username: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

Avatar.defaultProps = {
  hasPicture: false,
  imgSrc: "",
};
