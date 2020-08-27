import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import EditIcon from "../../public/icons/edit.svg";
import { API_URL } from "../../services/community";
import Avatar from "../Avatar";
import Icon from "../Icon";
import Card from "./Card";

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

const AvatarHolder = styled.div`
  position: relative;
`;

const IconHolder = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content center;

  background-color: ${(props) => props.theme.secondary};
  border: 4px solid ${(props) => props.theme.darkLight};
  border-radius: 50%;

  &:hover {
    border-color: ${(props) => props.theme.light};
  }
`;

export default function ProfileCard(props) {
  const hasFullName = props.user.firstName && props.user.lastName;

  return (
    <UserColumn>
      <AvatarHolder>
        <Avatar
          bordered
          size={256}
          imgSrc={props.user.avatar && API_URL + props.user.avatar.url}
          username={props.user.username}
        />
        {props.editAvatar && (
          <IconHolder onClick={() => props.editAvatar()}>
            <Icon size={32} color={"light"}>
              <EditIcon />
            </Icon>
          </IconHolder>
        )}
      </AvatarHolder>

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
