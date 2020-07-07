import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import ProfileCard from "../cards/ProfileCard";
import UploadForm from "../forms/UploadForm";
import AccountForm from "../forms/AccountForm";
import Overlay from "../overlay";

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

export default function SettingsGrid({ user }) {
  const [currentTab, setCurrentTab] = useState("Profile");
  const [showOverlay, setShowOverlay] = useState(false);

  function editPicture() {
    setShowOverlay(true);
  }

  function closeOverlay() {
    setShowOverlay(false);
  }

  return (
    <>
      <Overlay show={showOverlay}>
        <UploadForm closeOverlay={closeOverlay} />
      </Overlay>
      <Grid>
        <UserColumn>
          <ProfileCard editPicture={editPicture} user={user} />
        </UserColumn>
        <SettingsColumn>
          <Tabs>
            <Tab
              active={currentTab === "Profile"}
              onClick={() => setCurrentTab("Profile")}
            >
              Profile
            </Tab>
          </Tabs>

          {currentTab === "Profile" && <AccountForm initialInfos={user} />}
        </SettingsColumn>
      </Grid>
    </>
  );
}

SettingsGrid.propTypes = {
  /* User to display */
  user: PropTypes.object.isRequired,
};
