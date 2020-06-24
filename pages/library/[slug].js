import { getLibrarySection } from "../../services/community";
import MainLayout from "../../components/layouts/MainLayout";
import LibraryMediaCard from "../../components/cards/LibraryMediaCard";
import styled from "styled-components";

const TempGrid = styled.div`
  display: grid;
  grid-gap: ${(props) => props.theme.gridGap};
  grid-template-columns: repeat(6, 1fr);

  padding: 2rem 0;
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
