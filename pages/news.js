import ArticleGrid from "../components/grids/ArticleGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getArticlesPreview } from "../services/community";

export default function News({ articles }) {
  return (
    <MainLayout pageTitle={"The latest updates!"}>
      <ArticleGrid articles={articles} />
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
