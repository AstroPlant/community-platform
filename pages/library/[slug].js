import styled from "styled-components";
import LibraryMediaCard from "../../components/cards/LibraryMediaCard";
import Grid from "../../components/grids/Grid";
import MainLayout from "../../components/layouts/MainLayout";
import { getLibrarySection } from "../../services/community";
import MediasGrid from "../../components/grids/MediasGrid";

const MediaNumber = styled.h3`
  color: ${(props) => props.theme.primary};
`;

export default function LibrarySectionPage({ data }) {
  const section = data.librarySections[0];
  const mediaCount = data.mediaCount.aggregate.count;
  return (
    <MainLayout
      enableSearch
      searchFor={"libraryMedias"}
      pageTitle={section.title}
    >
      <Grid>
        <MediasGrid medias={section.library_medias} />
        <div>
          <MediaNumber>{mediaCount} medias</MediaNumber>
          <p>{section.description}</p>
        </div>
      </Grid>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const data = await getLibrarySection(context.params.slug);

  return {
    props: {
      data,
    },
  };
}
