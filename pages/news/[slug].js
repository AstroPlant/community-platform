import styled from "styled-components";
import Article from "../../components/Article";
import ArticleInfos from "../../components/ArticleInfos";
import ArticleCard from "../../components/cards/ArticleCard";
import Card from "../../components/cards/Card";
import Grid from "../../components/grids/Grid";
import PageLayout from "../../components/layouts/PageLayout";
import WrapInLink from "../../components/WrapInLink";
import withFallback from "../../hocs/withFallback";
import { getArticlesPaths, getFullArticle } from "../../services/community";
import { REVALIDATION_DELAY } from "../../utils/settings";

const AuthorCard = styled(Card)`
  && {
    height: unset;
    margin: 2rem 0;
  }
`;

const RelatedArticle = styled(ArticleCard)`
  && {
    height: unset;
    margin: 1rem 0;
  }
`;

function ArticlePage({ article, related }) {
  return (
    <PageLayout metaTitle={article.title} metaDescription={article.preview}>
      <Grid>
        <Article article={article} />
        <div>
          <h3>Author</h3>
          <WrapInLink
            href="/users/[username]"
            as={`/users/${article.author.username}`}
          >
            <AuthorCard animateOnHover>
              <ArticleInfos
                author={article.author}
                date={article.published_at}
              />
            </AuthorCard>
          </WrapInLink>
          <h3>Related Article</h3>
          {related.map((a) => (
            <RelatedArticle animateOnHover key={a.id} article={a} />
          ))}
        </div>
      </Grid>
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
