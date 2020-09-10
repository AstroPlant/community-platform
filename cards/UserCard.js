import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  align-items: center;

  padding: 2rem;
`;

const UserInfo = styled.div`
  margin: 0 0 0 1rem;
`;

const FullName = styled.p`
  margin: 0.5rem 0 0 0;
`;

export default function UserCard({ user, ...props }) {
  const hasFullName = user.firstName && user.lastName;

  return (
    <WrapInLink href={"/users/[username]"} as={`/users/${user.username}`}>
      <Container animateOnHover {...props}>
        <Avatar size={64} avatar={user.avatar} />
        <UserInfo>
          <b>{user.username}</b>

          {hasFullName && (
            <FullName>{`${user.firstName} ${user.lastName}`}</FullName>
          )}
        </UserInfo>
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
