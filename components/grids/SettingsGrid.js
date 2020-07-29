import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { updateLoggedUser } from "../../providers/Auth";
import Card from "../cards/Card";
import ProfileCard from "../cards/ProfileCard";
import AccountForm from "../forms/AccountForm";
import UploadForm from "../forms/UploadForm";
import Overlay from "../overlay";
import Grid from "./Grid";

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

const OverlayCard = styled(Card)`
  && {
    width: unset;
    height: unset;
  }
`;

const validationSchema = Yup.object().shape({
  files: Yup.mixed()
    .required("Please select a file before uploading.")
    .test(
      "fileSize",
      "Your file is too big ! The file size must be under 8 mb",
      (value) => value && value[0].size <= 8000000
    )
    .test(
      "fileFormat",
      "Wrong format. Must be an image (png, jpeg, jfif ...)",
      (value) => {
        return (
          value &&
          ["image/png", "image/jpeg", "image/jfif"].includes(value[0].type)
        );
      }
    ),
});

export default function SettingsGrid(props) {
  const [currentTab, setCurrentTab] = useState("Profile");
  const [showOverlay, setShowOverlay] = useState(false);
  const router = useRouter();

  function editAvatar() {
    setShowOverlay(true);
  }

  function closeOverlay() {
    setShowOverlay(false);
  }

  return (
    <>
      <Overlay show={showOverlay}>
        <OverlayCard>
          <UploadForm
            title={"Edit avatar"}
            closeForm={closeOverlay}
            validationSchema={validationSchema}
            uploadParameters={{
              refId: props.user.id,
              ref: "user",
              source: "users-permissions",
              field: "avatar",
            }}
            callback={async () => {
              await updateLoggedUser(props.user.username);
              router.replace("/settings");
            }}
          />
        </OverlayCard>
      </Overlay>

      <Grid inverted>
        <UserColumn>
          <ProfileCard editAvatar={editAvatar} user={props.user} />
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

          {currentTab === "Profile" && (
            <AccountForm initialInfos={props.user} />
          )}
        </SettingsColumn>
      </Grid>
    </>
  );
}

SettingsGrid.propTypes = {
  /* User to display */
  user: PropTypes.object.isRequired,
};
