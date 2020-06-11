import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";

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

export default function ProfileGrid({ user }) {
  return (
    <Grid>
      <UserColumn>
        <Avatar size={12} username={user.username} />
        <p>{user.displayName}</p>
      </UserColumn>
      <SettingsColumn></SettingsColumn>
    </Grid>
  );
}

ProfileGrid.propTypes = {
  user: PropTypes.object.isRequired,
};
