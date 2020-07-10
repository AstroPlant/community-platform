import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import WrapInLink from "./WrapInLink";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => props.size + "rem"};
  height: ${(props) => props.size + "rem"};

  border: ${(props) => props.bordered && `4px solid ${props.theme.primary}`};
  border-radius: 50%;

  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.light};

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

function PureAvatar(props) {
  const initialLetter = props.username.charAt(0).toUpperCase();
  const fontSize = props.size / 2;

  return (
    <Container size={props.size} bordered={props.bordered}>
      {props.imgSrc ? (
        <img src={props.imgSrc} alt={`${props.username}'s avatar`} />
      ) : (
        <Placeholder fontSize={fontSize}>{initialLetter}</Placeholder>
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
  /* Path to the user's avatar */
  imgSrc: PropTypes.string,
  username: PropTypes.string.isRequired,
  /* The size of the avatar in rem */
  size: PropTypes.number.isRequired,
  /* If the avatar is interactive where it should lead */
  href: PropTypes.string,
  /* url "as" path from next link. If the avatar is leading to a dynamic page */
  as: PropTypes.string,
  /* Whether or not the avatar should be outlined by a green border */
  bordered: PropTypes.bool,
};

Avatar.defaultProps = {
  imgSrc: null,
  href: null,
  as: null,
  bordered: false,
};
