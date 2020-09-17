import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../utils/breakpoints";
import Avatar from "./Avatar";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const DetailColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarHolder = styled(Avatar)`
  margin: 0 1rem 0 0;
  @media screen and (max-width: ${Breaks.large}) {
    && {
      height: 48px;
      width: 48px;
    }
  }
`;

const AuthorName = styled.b`
  text-transform: capitalize;
  font-size: 1.2em;
`;

export default function UserPreview({ user, className }) {
  const hasFullName = user.firstName && user.lastName;

  return (
    <Container className={className}>
      <AvatarHolder size={64} avatar={user.avatar} />

      <DetailColumn>
        {hasFullName ? (
          <>
            <AuthorName> {`${user.firstName} ${user.lastName}`}</AuthorName>
            <p>{user.username}</p>
          </>
        ) : (
          <AuthorName>{user.username}</AuthorName>
        )}
      </DetailColumn>
    </Container>
  );
}

UserPreview.propTypes = {
  /**
   * object containing the user details
   */
  user: PropTypes.object.isRequired,
};
