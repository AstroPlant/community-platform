import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import PersonIcon from "../public/icons/person.svg";
import { API_URL } from "../services/community";
import Icon from "./Icon";
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

const Placeholder = styled(Icon)`
  margin: 0;
`;

function PureAvatar({ size, avatar, ...props }) {
  return (
    <Container size={size} {...props}>
      {avatar ? (
        <img src={API_URL + avatar.url} alt={`user's avatar`} />
      ) : (
        <Placeholder size={size / 1.25}>
          <PersonIcon />
        </Placeholder>
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
   * Avatar object containing the link to the avatar
   */
  avatar: PropTypes.object,
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
  avatar: null,
  href: "/",
  as: "/",
};
