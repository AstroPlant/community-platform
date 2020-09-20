import ArticleCard from "../components/cards/ArticleCard";
import FeaturedArticleCard from "../components/cards/FeaturedArticleCard";
import ItemsGrid from "../components/grids/ItemsGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getArticles } from "../services/community";
import { REVALIDATION_DELAY } from "../utils/settings";

export default function News({ featured, articles }) {
  return (
    <MainLayout
      pageTitle={"The latest updates!"}
      metaTitle={"News"}
      metaDescription={"All the official news and update about AstroPlant !"}
    >
      <FeaturedArticleCard featuredArticle={featured} />
      <ItemsGrid columns={4}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ItemsGrid>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const data = await getArticles();

  return {
    props: {
      articles: data.previews || [],
      featured: data.featured[0] || [],
    },
    revalidate: REVALIDATION_DELAY,
  };
}
