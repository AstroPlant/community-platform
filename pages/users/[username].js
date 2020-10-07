import React from "react";
import styled from "styled-components";
import Card from "../../components/cards/Card";
import KitMembershipCard from "../../components/cards/KitMembershipCard";
import ProfileCard from "../../components/cards/ProfileCard";
import SimpleMediaCard from "../../components/cards/SimpleMediaCard";
import Grid from "../../components/grids/Grid";
import MainLayout from "../../components/layouts/MainLayout";
import {
  getLibraryMediasByAuthor,
  getUserDetails,
} from "../../services/community";
import { getUserMemberships } from "../../services/data-api";
import useTabs from "../../utils/useTabs";

const UserContent = styled(Card)`
  && {
    flex-direction: column;
  }
`;

export default function Profile({ user, memberships, medias }) {
  const { currentTab, Tabs } = useTabs(["Kits", "Medias"]);

  return (
    <MainLayout
      pageTitle={user.username}
      metaTitle={user.username}
      metaDescription={user.description}
    >
      <Grid inverted>
        <ProfileCard user={user} />
        <UserContent>
          <Tabs />
          {currentTab === "Kits" && (
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
          {currentTab === "Medias" && (
            <>
              {medias.length === 0 ? (
                <p>No medias were found.</p>
              ) : (
                <>
                  {medias.map((media) => (
                    <SimpleMediaCard key={media.id} media={media} />
                  ))}
                </>
              )}
            </>
          )}
        </UserContent>
      </Grid>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const user = await getUserDetails(context.params.username);

  const memberships = await getUserMemberships(user.username);
  const medias = await getLibraryMediasByAuthor(user.id);

  return {
    props: {
      user: user,
      memberships: memberships || [],
      medias: medias || [],
    },
  };
}
