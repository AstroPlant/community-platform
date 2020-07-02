import React from "react";
import SettingsGrid from "../components/grids/SettingsGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getLoggedUser } from "../providers/Auth";
import { getUserDetails } from "../services/community";
import withAuth from "../hocs/withAuth";

function Settings({ user }) {
  return (
    <MainLayout pageTitle={"Settings"}>
      <SettingsGrid user={user} />
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const user = getLoggedUser(ctx.req.headers.cookie);
  const completeUser = await getUserDetails(user.username);

  return {
    props: {
      user: completeUser,
    },
  };
}

export default withAuth(Settings);
