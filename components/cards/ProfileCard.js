import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Card from "./Card";
import Avatar from "../Avatar";
import EditIcon from "../../public/icons/edit.svg";
import Icon from "../Icon";
import { API_URL } from "../../services/community";

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

  background-color: ${(props) => props.theme.secondaryDark};
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
          size={12}
          imgSrc={props.user.picture && API_URL + props.user.picture.url}
          username={props.user.username}
        />
        {props.editPicture && (
          <IconHolder onClick={() => props.editPicture()}>
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
  /* User to display */
  user: PropTypes.object.isRequired,
  /* function to open the picture edition form */
  editPicture: PropTypes.func,
};

ProfileCard.defaultProps = {
  editPicture: null,
};
