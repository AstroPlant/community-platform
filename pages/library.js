import React from "react";
import PropTypes from "prop-types";
import MainLayout from "../components/layouts/MainLayout";
import {
  getAllLibrarySections,
  getFeaturedLibraryMedias,
} from "../services/community";
import LibraryGrid from "../components/grids/LibraryGrid";

export default function Library({ librarySections, featuredMedias }) {
  return (
    <MainLayout pageTitle={"Your first time in the Library ?"}>
      <LibraryGrid
        featuredMedias={featuredMedias}
        librarySections={librarySections}
      />
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const librarySections = await getAllLibrarySections();
  const featuredMedias = await getFeaturedLibraryMedias();

  return {
    props: {
      librarySections,
      featuredMedias,
    },
  };
}
