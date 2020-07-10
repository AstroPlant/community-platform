import styled from "styled-components";
import LibraryMediaCard from "../../components/cards/LibraryMediaCard";
import Grid from "../../components/grids/Grid";
import MainLayout from "../../components/layouts/MainLayout";
import { getLibrarySection } from "../../services/community";

const TempGrid = styled(Grid)`
  && {
    grid-template-columns: repeat(6, 1fr);
  }

  width: 100%;
`;

export default function LibrarySectionPage({ section }) {
  return (
    <MainLayout pageTitle={section.title}>
      <TempGrid>
        {section.library_medias.map((media) => (
          <LibraryMediaCard key={media.id} media={media} />
        ))}
      </TempGrid>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const section = await getLibrarySection(context.params.slug);

  return {
    props: {
      section,
    },
  };
}
