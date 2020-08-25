import styled from "styled-components";
import Grid from "../../components/grids/Grid";
import MediasGrid from "../../components/grids/MediasGrid";
import MainLayout from "../../components/layouts/MainLayout";
import { getLibrarySection } from "../../services/community";
import Breaks from "../../utils/breakpoints";

const MediaNumber = styled.h3`
  color: ${(props) => props.theme.primary};
`;

const InfoSection = styled.div`
  @media screen and (max-width: ${Breaks.large}) {
    grid-row: 1;
  }
`;

export default function LibrarySectionPage({ data }) {
  const section = data.librarySections[0];
  const mediaCount = data.mediaCount.aggregate.count;
  return (
    <MainLayout
      pageTitle={section.title}
      metaTitle={section.title + " Library"}
      metaDescription={section.description}
    >
      <Grid>
        <MediasGrid medias={section.library_medias} />
        <InfoSection>
          <MediaNumber>{mediaCount} medias</MediaNumber>
          <p>{section.description}</p>
        </InfoSection>
      </Grid>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: await getLibrarySection(context.params.slug),
    },
  };
}
