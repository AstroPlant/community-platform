import React from "react";
import SettingsGrid from "../components/grids/SettingsGrid";
import MainLayout from "../components/layouts/MainLayout";
import withAuth from "../hocs/withAuth";
import { getLoggedUser } from "../providers/Auth";
import { getUserDetails } from "../services/community";

function Settings({ user }) {
  return (
    <MainLayout pageTitle={"Settings"} metaTitle={"Settings"}>
      <SettingsGrid user={user} />
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const user = getLoggedUser(ctx.req.headers.cookie);
  let completeUser = null;

  if (user != null) {
    completeUser = await getUserDetails(user.username);
  }

  return {
    props: {
      user: completeUser,
    },
  };
}

export default withAuth(Settings);
