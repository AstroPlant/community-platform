import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Card from "./Card";
import Avatar from "../Avatar";

const UserColumn = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FullName = styled.h3`
  margin: 1rem 0 0 0;
`;

const SlackUsername = styled.h4`
  margin: 1rem 0;

  color: ${(props) => props.theme.primary};
  font-style: italic;
  font-weight: 300;
`;

const Description = styled.p`
  margin: 1rem 0;

  text-align: center;
`;

export default function ProfileCard(props) {
  const hasFullName = props.user.firstName && props.user.lastName;

  return (
    <UserColumn>
      <Avatar
        size={12}
        imgSrc={props.user.picture && API_URL + props.user.picture.url}
        username={props.user.username}
      />
      <FullName>
        {hasFullName
          ? `${props.user.firstName} ${props.user.lastName}`
          : props.user.username}
      </FullName>
      <SlackUsername>@{props.user.slackUsername}</SlackUsername>
      <Description>{props.user.description}</Description>
    </UserColumn>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
};
