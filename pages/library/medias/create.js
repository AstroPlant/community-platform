import React from "react";
import MediaCreationForm from "../../../components/forms/MediaCreationForm";
import MainLayout from "../../../components/layouts/MainLayout";
import withAuth from "../../../hocs/withAuth";
import { getAllLibrarySectionNames } from "../../../services/community";

function CreateMediaPage({ librarySections }) {
  return (
    <MainLayout pageTitle={"Create Media"}>
      <MediaCreationForm librarySections={librarySections} />
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const librarySections = await getAllLibrarySectionNames();

  return {
    props: {
      librarySections,
    },
  };
}

export default withAuth(CreateMediaPage);
