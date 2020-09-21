import styled from "styled-components";
import LibraryMediaCard from "../../components/cards/LibraryMediaCard";
import Grid from "../../components/grids/Grid";
import ItemsGrid from "../../components/grids/ItemsGrid";
import MainLayout from "../../components/layouts/MainLayout";
import withFallback from "../../hocs/withFallback";
import {
  getLibrarySection,
  getLibrarySectionsPaths,
} from "../../services/community";
import Breaks from "../../utils/breakpoints";
import { REVALIDATION_DELAY } from "../../utils/settings";

const MediaNumber = styled.h3`
  color: ${(props) => props.theme.primary};
  margin-bottom: 1rem;
`;

const InfoSection = styled.div`
  @media screen and (max-width: ${Breaks.large}) {
    grid-row: 1;
  }
`;

function LibrarySectionPage({ section }) {
  return (
    <MainLayout
      pageTitle={section.title}
      metaTitle={section.title + " Library"}
      metaDescription={section.description}
    >
      <Grid inverted>
        <InfoSection>
          <MediaNumber>{section.library_medias_count} medias</MediaNumber>
          <p>{section.description}</p>
        </InfoSection>
        <ItemsGrid>
          {section.library_medias.map((media) => (
            <LibraryMediaCard key={media.id} media={media} />
          ))}
        </ItemsGrid>
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
    },
    revalidate: REVALIDATION_DELAY,
  };
}

export default withFallback(LibrarySectionPage, "section");
