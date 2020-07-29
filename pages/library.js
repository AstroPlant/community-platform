import React from "react";
import LibraryGrid from "../components/grids/LibraryGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getAllLibrarySections } from "../services/community";

export default function Library({ librarySections }) {
  return (
    <MainLayout
      enableSearch
      searchFor={"libraryMedias"}
      toolsFor={"libraryMedias"}
      pageTitle={"AstroPlant Library"}
      metaTitle={"Library"}
      metaDescription={"Everything you need to get started and contribute."}
    >
      <LibraryGrid librarySections={librarySections} />
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      librarySections: await getAllLibrarySections(),
    },
  };
}
