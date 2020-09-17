import PostLayout from "../../../components/posts/PostLayout";
import PageLayout from "../../../components/layouts/PageLayout";
import withFallback from "../../../hocs/withFallback";
import {
  getLibraryMedia,
  getLibraryMediasPaths,
} from "../../../services/community";

function LibraryMediaPage({ media }) {
  return (
    <PageLayout metaTitle={media.title}>
      <PostLayout post={media} type="media" />
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
