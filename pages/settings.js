import React from "react";
import ProfileGrid from "../components/grids/ProfileGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getLoggedUser } from "../providers/Auth";
import { getUserDetails } from "../services/community";

export default function Settings({ user }) {
  return (
    <MainLayout pageTitle={"Settings"}>
      <ProfileGrid user={user} />
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
