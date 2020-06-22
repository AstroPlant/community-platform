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

function PureAvatar({ imgSrc, username, size }) {
  const initial = username.charAt(0).toUpperCase();
  const fontSize = size / 2;
  return (
    <Container size={size}>
      {imgSrc ? (
        <img src={imgSrc} />
      ) : (
        <Placeholder fontSize={fontSize}>{initial}</Placeholder>
      )}
    </Container>
  );
}

export default function Avatar(props) {
  return (
    <>
      {props.href ? (
        <WrapInLink href={props.href} as={props.as}>
          <PureAvatar {...props} />
        </WrapInLink>
      ) : (
        <PureAvatar {...props} />
      )}
    </>
  );
}

Avatar.propTypes = {
  imgSrc: PropTypes.string,
  username: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  href: PropTypes.string,
  as: PropTypes.string,
};

Avatar.defaultProps = {
  imgSrc: null,
  href: null,
  as: null,
};
