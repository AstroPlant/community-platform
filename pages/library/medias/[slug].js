import styled from "styled-components";
import ArticleInfos from "../../../components/ArticleInfos";
import Card from "../../../components/cards/Card";
import Grid from "../../../components/grids/Grid";
import PageLayout from "../../../components/layouts/PageLayout";
import LibraryMedia from "../../../components/LibraryMedia";
import WrapInLink from "../../../components/WrapInLink";
import withFallback from "../../../hocs/withFallback";
import {
  getLibraryMedia,
  getLibraryMediasPaths,
} from "../../../services/community";

const AuthorCard = styled(Card)`
  && {
    height: unset;
    margin: 2rem 0;
  }
`;

function LibraryMediaPage({ media }) {
  return (
    <PageLayout metaTitle={media.title}>
      <Grid>
        <LibraryMedia media={media} />
        <div>
          <h3>Author</h3>
          <WrapInLink
            href="/users/[username]"
            as={`/users/${media.author.username}`}
          >
            <AuthorCard>
              <ArticleInfos author={media.author} date={media.created_at} />
            </AuthorCard>
          </WrapInLink>
        </div>
      </Grid>
    </PageLayout>
  );
}

export async function getStaticPaths() {
  const medias = await getLibraryMediasPaths();

  return {
    paths: medias.map((media) => {
      return {
        params: {
          slug: media.slug,
        },
      };
    }),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const media = await getLibraryMedia(context.params.slug);
  return {
    props: {
      media: media || null,
    },
  };
}

export default withFallback(LibraryMediaPage, "media");
