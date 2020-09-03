import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import Button from "../Button";
import Grid from "../grids/Grid";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  && {
    padding: ${(props) => props.showEdit && `0`};
  }
`;

const SlackUsername = styled.h4`
  margin: 1rem 0;

  color: ${(props) => props.theme.primary};
  font-size: 1.35rem;
  font-style: italic;
  font-weight: 300;
`;

const Description = styled.p`
  margin: 0.5rem 0;

  text-align: center;
`;

const AvatarHolder = styled.div`
  position: relative;
  margin: 1rem 0;
`;

const ButtonRow = styled(Grid)`
  && {
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;

    padding 0;
    margin: 1.5rem 0;

    width: 100%;
  }
`;

const EditButton = styled(Button)`
  && {
    width: 100%;
    margin: 0;
  }
`;

export default function ProfileCard({ editAvatar, user }) {
  const hasFullName = user.firstName && user.lastName;

  return (
    <Container showEdit={editAvatar}>
      <h3>{user.username}</h3>

      <AvatarHolder>
        <Avatar size={256} avatar={user.avatar} />
        {editAvatar && (
          <ButtonRow>
            <EditButton inverted label="Clear" color="secondary" />
            <EditButton
              label="Edit"
              color="primary"
              onClick={() => editAvatar()}
            />
          </ButtonRow>
        )}
      </AvatarHolder>

      {hasFullName && <h3>{`${user.firstName} ${user.lastName}`} </h3>}

      {user.slackUsername && (
        <SlackUsername>@{user.slackUsername}</SlackUsername>
      )}

      <Description>{user.description}</Description>
    </Container>
  );
}

ProfileCard.propTypes = {
  /**
   * Object containing the user information
   */
  user: PropTypes.object.isRequired,

  /**
   * Function to open the avatar edition form
   */
  editAvatar: PropTypes.func,
};

ProfileCard.defaultProps = {
  editAvatar: null,
};
