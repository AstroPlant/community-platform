import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import UserPreview from "../UserPreview";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  && {
    align-items: center;
    padding: 1.5rem;
  }
`;

export default function UserCard({ user, ...props }) {
  return (
    <WrapInLink href={"/users/[username]"} as={`/users/${user.username}`}>
      <Container animateOnHover {...props}>
        <UserPreview user={user} />
      </Container>
    </WrapInLink>
  );
}

UserCard.propTypes = {
  /**
   * Object containing the user information
   */
  user: PropTypes.object.isRequired,
};
