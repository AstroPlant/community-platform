import FeaturedArticleCard from "../components/cards/FeaturedArticleCard";
import ArticleGrid from "../components/grids/ArticleGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getArticles } from "../services/community";

export default function News({ featured, articles }) {
  return (
    <MainLayout
      enableSearch
      searchFor={"articles"}
      pageTitle={"The latest updates!"}
    >
      <FeaturedArticleCard featuredArticle={featured} />
      <ArticleGrid articles={articles} />
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const data = await getArticles();
  const featured = data.featured[0];
  const articles = data.previews;
  return {
    props: {
      articles,
      featured,
    },
  };
}
