import ArticleGrid from "../components/grids/ArticleGrid";
import NewsCard from "../components/cards/NewsCard";
import Layout from "../components/layouts/Layout";
import { getArticlesPreview } from "../lib/community";

export default function News({ articles }) {
  return (
    <div className="container">
      <Layout title={"The latest updates!"}>
        <ArticleGrid>
          {articles.map((article) => (
            <NewsCard
              article={article}
              key={article.id}
              href={"/news/[slug]"}
              as={"/news/" + article.slug}
            />
          ))}
        </ArticleGrid>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      articles: await getArticlesPreview(),
    },
  };
}
