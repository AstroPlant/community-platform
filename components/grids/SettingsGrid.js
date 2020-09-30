import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import useTabs from "../../utils/useTabs";
import KitMembershipCard from "../cards/KitMembershipCard";
import ProfileCard from "../cards/ProfileCard";
import SimpleMediaCard from "../cards/SimpleMediaCard";
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

export default function SettingsGrid({ user, memberships, medias }) {
  const { currentTab, Tabs } = useTabs(["My Profile", "My Kits", "My Medias"]);

  return (
    <>
      <Grid inverted>
        <UserColumn>
          <ProfileCard editAvatar user={user} />
        </UserColumn>
        <Column>
          <Tabs />

          {currentTab === "My Profile" && <AccountForm initialInfos={user} />}
          {currentTab === "My Kits" && (
            <>
              {memberships.length === 0 || memberships.status === 404 ? (
                <p>No kits were found.</p>
              ) : (
                <>
                  {memberships.map((membership) => (
                    <KitMembershipCard
                      key={membership.id}
                      membership={membership}
                    />
                  ))}
                </>
              )}
            </>
          )}
          {currentTab === "My Medias" && (
            <>
              {medias.length === 0 ? (
                <p>No medias were found.</p>
              ) : (
                <>
                  {medias.map((media) => (
                    <SimpleMediaCard key={media.id} showTools media={media} />
                  ))}
                </>
              )}
            </>
          )}
        </Column>
      </Grid>
    </>
  );
}

SettingsGrid.propTypes = {
  /**
   * Object containing user information
   */
  user: PropTypes.object.isRequired,
  /**
   * Array of kit membership objects
   */
  memberships: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Array of media objects
   */
  medias: PropTypes.arrayOf(PropTypes.object).isRequired,
};
