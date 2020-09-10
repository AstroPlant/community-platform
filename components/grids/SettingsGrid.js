import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import ProfileCard from "../cards/ProfileCard";
import AccountForm from "../forms/AccountForm";
import Grid from "./Grid";

const Column = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem;

  background-color: ${(props) => props.theme.darkLight};
  border-radius: ${(props) => props.theme.radiusMax};
`;

const UserColumn = styled(Column)`
  align-items: center;
  justify-content: center;
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

export default function SettingsGrid(props) {
  const [currentTab, setCurrentTab] = useState("Profile");

  return (
    <>
      <Grid inverted>
        <UserColumn>
          <ProfileCard editAvatar user={props.user} />
        </UserColumn>
        <Column>
          <Tabs>
            <Tab
              active={currentTab === "Profile"}
              onClick={() => setCurrentTab("Profile")}
            >
              Profile
            </Tab>
          </Tabs>

          {currentTab === "Profile" && (
            <AccountForm initialInfos={props.user} />
          )}
        </Column>
      </Grid>
    </>
  );
}

SettingsGrid.propTypes = {
  /* Object containing user information */
  user: PropTypes.object.isRequired,
};
