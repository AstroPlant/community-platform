import styled from "styled-components";
import Grid from "../../components/grids/Grid";
import MediasGrid from "../../components/grids/MediasGrid";
import MainLayout from "../../components/layouts/MainLayout";
import withFallback from "../../hocs/withFallback";
import {
  getLibrarySectionsPaths,
  getLibrarySection,
} from "../../services/community";
import Breaks from "../../utils/breakpoints";

const MediaNumber = styled.h3`
  color: ${(props) => props.theme.primary};
`;

const InfoSection = styled.div`
  @media screen and (max-width: ${Breaks.large}) {
    grid-row: 1;
  }
`;

function LibrarySectionPage({ section, mediaCount }) {
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

export async function getStaticPaths() {
  const libraries = await getLibrarySectionsPaths();

  return {
    paths: libraries.map((lib) => {
      return {
        params: {
          slug: lib.slug,
        },
      };
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await getLibrarySection(params.slug);

  return {
    props: {
      section: data.librarySections[0] || null,
      mediaCount: data.mediaCount.aggregate.count || null,
    },
    revalidate: 30,
  };
}

export default withFallback(LibrarySectionPage, "section");
