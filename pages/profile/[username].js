import React from "react";
import ProfileGrid from "../../components/grids/ProfileGrid";
import MainLayout from "../../components/layouts/MainLayout";
import { getUserDetails } from "../../services/data-api";

export default function Profile({ user }) {
  return (
    <MainLayout pageTitle={user.username}>
      <ProfileGrid user={user} />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const user = await getUserDetails(context.params.username);

  return {
    props: {
      user,
    },
  };
}
