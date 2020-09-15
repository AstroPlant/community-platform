import React from "react";
import LibraryGrid from "../components/grids/LibraryGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getAllLibrarySections } from "../services/community";
import { REVALIDATION_DELAY } from "../utils/settings";

export default function Library({ librarySections }) {
  return (
    <MainLayout
      pageTitle={"AstroPlant Library"}
      metaTitle={"Library"}
      metaDescription={"Everything you need to get started and contribute."}
    >
      <LibraryGrid librarySections={librarySections} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      librarySections: await getAllLibrarySections(),
    },
    revalidate: REVALIDATION_DELAY,
  };
}
