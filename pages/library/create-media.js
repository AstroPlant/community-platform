import React from "react";
import MediaCreationForm from "../../components/forms/MediaCreationForm";
import PageLayout from "../../components/layouts/PageLayout";
import withAuth from "../../hocs/withAuth";
import { getAllLibrarySectionNames } from "../../services/community";

function CreateMediaPage({ librarySections }) {
  return (
    <PageLayout pageTitle={"Create Media"}>
      <MediaCreationForm librarySections={librarySections} />
    </PageLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      librarySections: await getAllLibrarySectionNames(),
    },
  };
}

export default withAuth(CreateMediaPage);
