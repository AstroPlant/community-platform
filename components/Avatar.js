import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import PersonIcon from "../public/icons/person.svg";
import Icon from "./Icon";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};

  border-radius: 50%;

  background-color: ${(props) => props.theme.greyDark};
  color: ${(props) => props.theme.light};

  overflow: hidden;
`;

const Placeholder = styled(Icon)`
  margin: 0;
  cursor: unset;
`;

export default function Avatar({ size, avatar, ...props }) {
  return (
    <Container size={size} {...props}>
      {avatar ? (
        <img
          src={process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL + avatar.url}
          alt={`user's avatar`}
        />
      ) : (
        <Placeholder size={size / 1.5}>
          <PersonIcon />
        </Placeholder>
      )}
    </Container>
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
};

Avatar.defaultProps = {
  avatar: null,
};
