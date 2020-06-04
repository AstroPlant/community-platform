import ArticleGrid from "../components/ArticleGrid";
import Layout from "../components/Layout";
import { getArticlesPreview } from "../lib/community";
import NewsCard from "../components/Cards/NewsCard";

export default function News({ articles }) {
  return (
    <div className="container">
      <Layout title={"The latest updates!"}>
        <ArticleGrid>
          {articles.map((article) => (
            <NewsCard
              title={article.title}
              key={article.id}
              description={article.short_description}
              imgSrc={"http://localhost:1337" + article.cover.url}
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
