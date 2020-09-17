import PageLayout from "../../components/layouts/PageLayout";
import PostLayout from "../../components/posts/PostLayout";
import withFallback from "../../hocs/withFallback";
import { getArticlesPaths, getFullArticle } from "../../services/community";
import { REVALIDATION_DELAY } from "../../utils/settings";

function ArticlePage({ article, related }) {
  return (
    <PageLayout metaTitle={article.title} metaDescription={article.preview}>
      <PostLayout post={article} type="article" relatedPosts={related} />
    </PageLayout>
  );
}

export async function getStaticPaths() {
  const articles = await getArticlesPaths();

  return {
    // Generated at build time
    paths: articles.map((article) => {
      return {
        params: {
          slug: article.slug,
        },
      };
    }),
    // Enabling statically generating additional pages after build
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await getFullArticle(params.slug);

  return {
    props: {
      article: data.main_article[0] || null,
      related: data.related_articles || null,
    },
    revalidate: REVALIDATION_DELAY,
  };
}

export default withFallback(ArticlePage, "article");
