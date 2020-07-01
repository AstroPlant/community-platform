import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import { API_URL } from "../../services/community";
import InProgress from "../InProgress";

const Grid = styled.div`
  display: grid;
  grid-gap: ${(props) => props.theme.gridGap};
  grid-template-columns: 1fr 2fr;
  padding: 2rem 0;
`;

const Column = styled.div`
  background-color: ${(props) => props.theme.darkLight};
  padding: 2rem;

  display: flex;
  flex-direction: column;
`;

const UserColumn = styled(Column)`
  align-items: center;
  justify-content: center;
`;

const SettingsColumn = styled(Column)`
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

export default function ProfileGrid({ user }) {
  return (
    <Grid>
      <UserColumn>
        <Avatar
          size={12}
          imgSrc={user.picture && API_URL + user.picture.url}
          username={user.username}
        />
        <FullName>
          {user.firstName} {user.lastName}
        </FullName>
        <SlackUsername>{user.slackUsername}</SlackUsername>
        <Description>{user.description}</Description>
      </UserColumn>
      <SettingsColumn>
        <InProgress
          title={"Currently in the works"}
          details={
            "This section is currenly in the works, soon you should be able to customize your account here. If you have ideas for this section or want to help, please shoot us a message on the Slack!"
          }
        />
      </SettingsColumn>
    </Grid>
  );
}

ProfileGrid.propTypes = {
  user: PropTypes.object.isRequired,
};
