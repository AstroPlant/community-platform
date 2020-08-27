import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import WrapInLink from "./WrapInLink";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};

  border-radius: ${(props) => props.theme.radiusMax};

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
  font-size: ${(props) => props.fontSize + "px"};
`;

function PureAvatar({ size, imgSrc, username, ...props }) {
  const initial = username.charAt(0).toUpperCase();
  const fontSize = size / 2;

  return (
    <Container size={size} {...props}>
      {imgSrc ? (
        <img src={imgSrc} alt={`${username}'s avatar`} />
      ) : (
        <Placeholder fontSize={fontSize}>{initial}</Placeholder>
      )}
    </Container>
  );
}

export default function Avatar({ as, href, ...props }) {
  return (
    <>
      {href ? (
        <WrapInLink href={href} as={as}>
          <PureAvatar {...props} />
        </WrapInLink>
      ) : (
        <PureAvatar {...props} />
      )}
    </>
  );
}

Avatar.propTypes = {
  /**
   * Path to the image
   */
  imgSrc: PropTypes.string,
  /**
   * Username of the avatar owner
   */
  username: PropTypes.string.isRequired,
  /**
   * The size of the avatar in pixel
   */
  size: PropTypes.number.isRequired,
  /**
   * If the avatar is interactive where it should lead
   */
  href: PropTypes.string,
  /**
   * url "as" path from next link. If the avatar is leading to a dynamic page
   */
  as: PropTypes.string,
};

Avatar.defaultProps = {
  imgSrc: null,
  href: "/",
  as: "/",
  bordered: false,
};
