import ArticleLayout from "../../components/layouts/ArticleLayout";
import Article from "../../components/Article";
import { getFullArticle } from "../../services/community";

export default function ArticlePage({ article }) {
  return (
    <ArticleLayout>
      <Article article={article} />
    </ArticleLayout>
  );
}

export async function getServerSideProps(context) {
  const article = await getFullArticle(context.params.slug);

  return {
    props: {
      article,
    },
  };
}
