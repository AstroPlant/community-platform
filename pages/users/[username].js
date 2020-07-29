import React from "react";
import styled from "styled-components";
import ProfileCard from "../../components/cards/ProfileCard";
import MainLayout from "../../components/layouts/MainLayout";
import { getUserDetails } from "../../services/community";

const ProfileLayout = styled.div`
  margin: 0 auto;
  padding: 2rem 0;
`;

export default function Profile({ user }) {
  return (
    <MainLayout pageTitle={user.username} metaTitle={user.username}>
      <ProfileLayout>
        <ProfileCard user={user} />
      </ProfileLayout>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      user: await getUserDetails(context.params.username),
    },
  };
}
