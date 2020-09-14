import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { useSnackBars } from "../../providers/SnackBarProvider";
import { updateUserInfo } from "../../services/community";
import { getErrorMessage, hasError } from "../../utils/fetchTools";
import useModal from "../../utils/useModal";
import Avatar from "../Avatar";
import Button from "../Button";
import UploadForm from "../forms/UploadForm";
import Grid from "../grids/Grid";
import Modal from "../Modal";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  && {
    padding: ${(props) => props.editAvatar && `0`};
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
  const { show, toggle } = useModal();
  const { addAlert } = useSnackBars();

  async function clearProfilePicture() {
    const res = await updateUserInfo(user.id, { avatar: null });

    if (hasError(res)) {
      addAlert(
        "success",
        "Your profile picture has benn cleared successfully !"
      );
    } else {
      addAlert(
        "error",
        `Could not clear your profile picture: ${getErrorMessage(res)}`
      );
    }
  }

  return (
    <>
      <Container editAvatar={editAvatar}>
        <AvatarHolder>
          <Avatar size={256} avatar={user.avatar} />
          {editAvatar && (
            <ButtonRow>
              <EditButton
                inverted
                disabled={user.avatar === null}
                label="Clear"
                color="secondary"
                onClick={() => clearProfilePicture()}
              />
              <EditButton
                label="Edit"
                color="primary"
                onClick={() => toggle()}
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

      <Modal
        title="Change your avatar"
        show={show}
        handleClose={() => toggle()}
      >
        <UploadForm
          uploadParameters={{
            refId: user.id,
            ref: "user",
            source: "users-permissions",
            field: "avatar",
          }}
        />
      </Modal>
    </>
  );
}

ProfileCard.propTypes = {
  /**
   * Object containing the user information
   */
  user: PropTypes.object.isRequired,

  /**
   * Whether or not to show the avatr edition tools
   */
  editAvatar: PropTypes.bool,
};

ProfileCard.defaultProps = {
  editAvatar: false,
};
