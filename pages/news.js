import ArticleGrid from "../components/grids/ArticleGrid";
import NewsCard from "../components/cards/NewsCard";
import MainLayout from "../components/layouts/MainLayout";
import { getArticlesPreview } from "../services/community";

export default function News({ articles }) {
  return (
    <MainLayout pageTitle={"The latest updates!"}>
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
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      articles: await getArticlesPreview(),
    },
  };
}
