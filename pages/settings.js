import React from "react";
import SettingsGrid from "../components/grids/SettingsGrid";
import MainLayout from "../components/layouts/MainLayout";
import withAuth from "../hocs/withAuth";
import { getLoggedUser } from "../providers/Auth";
import {
  getLibraryMediasByAuthor,
  getUserDetails,
} from "../services/community";
import { getUserMemberships } from "../services/data-api";

function Settings({ user, memberships, medias }) {
  return (
    <MainLayout pageTitle={"Settings"} metaTitle={"Settings"}>
      <SettingsGrid user={user} memberships={memberships} medias={medias} />
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const user = getLoggedUser(ctx.req.headers.cookie);

  let completeUser = null;
  let memberships = null;
  let medias = null;

  if (user != null) {
    completeUser = await getUserDetails(user.username);
    memberships = await getUserMemberships(user.username);
    medias = await getLibraryMediasByAuthor(user.id);
  }

  return {
    props: {
      user: completeUser || null,
      memberships: memberships || [],
      medias: medias || [],
    },
  };
}

export default withAuth(Settings);
