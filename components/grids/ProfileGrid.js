import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import { API_URL } from "../../services/community";
import AccountForm from "../forms/AccountForm";
import ResetPasswordForm from "../forms/ResetPasswordForm";

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

const SettingsColumn = styled(Column)``;

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

const Tabs = styled.div`
  display: flex;
  align-items: center;

  margin: 0 0 1.5rem 0;
`;

const Tab = styled.p`
  position: relative;
  width: min-content;

  font-weight: 450;
  line-height: 1.75;

  margin: 0 1.5rem 0 0;

  cursor: pointer;

  &:after {
    content: " ";

    position: absolute;
    display: ${(props) => (props.active ? "block" : "none")};
    bottom: 0;

    width: 100%;
    height: 2px;
    background-color: ${(props) => props.theme.primary};
  }
`;

export default function ProfileGrid({ user }) {
  const [currentTab, setCurrentTab] = useState("Profile");

  const hasFullName = user.firstName && user.lastName;

  return (
    <Grid>
      <UserColumn>
        <Avatar
          size={12}
          imgSrc={user.picture && API_URL + user.picture.url}
          username={user.username}
        />
        <FullName>
          {hasFullName ? `${user.firstName} ${user.lastName}` : user.username}
        </FullName>
        <SlackUsername>{user.slackUsername}</SlackUsername>
        <Description>{user.description}</Description>
      </UserColumn>
      <SettingsColumn>
        <Tabs>
          <Tab
            active={currentTab === "Profile"}
            onClick={() => setCurrentTab("Profile")}
          >
            Profile
          </Tab>
          <Tab
            active={currentTab === "Password"}
            onClick={() => setCurrentTab("Password")}
          >
            Password
          </Tab>
        </Tabs>
        {currentTab === "Profile" && <AccountForm initialInfos={user} />}
        {currentTab === "Password" && <ResetPasswordForm />}
      </SettingsColumn>
    </Grid>
  );
}

ProfileGrid.propTypes = {
  user: PropTypes.object.isRequired,
};
