import React from "react";
import LibrarySectionCard from "../components/cards/LibrarySectionCard";
import ItemsGrid from "../components/grids/ItemsGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getAllLibrarySections } from "../services/community";
import { REVALIDATION_DELAY } from "../utils/settings";

export default function Library({ librarySections }) {
  return (
    <MainLayout
      pageTitle={"AstroPlant Library"}
      metaTitle={"Library"}
      metaDescription={
        "The AstroPlant library, a place to share with the community and find useful resources for AstroPlant related topics."
      }
    >
      <ItemsGrid>
        {librarySections.map((section) => (
          <LibrarySectionCard
            key={section.id}
            librarySection={section}
            mediaCount={section.library_medias_count}
          />
        ))}
      </ItemsGrid>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const librarySections = await getAllLibrarySections();

  return {
    props: {
      librarySections: librarySections || [],
    },
    revalidate: REVALIDATION_DELAY,
  };
}
