import React from "react";
import LibraryGrid from "../components/grids/LibraryGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getAllLibrarySections } from "../services/community";

export default function Library({ librarySections }) {
  return (
    <MainLayout
      enableSearch
      searchFor={"libraryMedias"}
      pageTitle={"AstroPlant Library"}
    >
      <LibraryGrid librarySections={librarySections} />
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const librarySections = await getAllLibrarySections();

  return {
    props: {
      librarySections,
    },
  };
}
