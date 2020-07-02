import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import { getUserDetails } from "../../services/community";
import ProfileCard from "../../components/cards/ProfileCard";
import styled from "styled-components";

const ProfileLayout = styled.div`
  margin: 0 auto;
  padding: 2rem 0;
`;
export default function Profile({ user }) {
  return (
    <MainLayout pageTitle={user.username}>
      <ProfileLayout>
        <ProfileCard user={user} />
      </ProfileLayout>
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
