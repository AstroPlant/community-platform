import React from "react";
import MediaCreationForm from "../../components/forms/MediaCreationForm";
import PageLayout from "../../components/layouts/PageLayout";
import withAuth from "../../hocs/withAuth";
import {
  getAllLibrarySectionNames,
  getLibraryMediaById,
} from "../../services/community";

function CreateMediaPage({ librarySections, media }) {
  return (
    <PageLayout metaTitle={"Create Media"}>
      <MediaCreationForm
        librarySections={librarySections}
        mediaToEdit={media}
      />
    </PageLayout>
  );
}

export async function getServerSideProps(ctx) {
  const mediaId = ctx.query.id || null;
  let media = null;

  if (mediaId) {
    media = await getLibraryMediaById(mediaId);
  }

  return {
    props: {
      librarySections: await getAllLibrarySectionNames(),
      media: media,
    },
  };
}

export default withAuth(CreateMediaPage);
