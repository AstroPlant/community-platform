import ArticleLayout from "../../components/layouts/ArticleLayout";
import { getFullArticle } from "../../services/community";

export default function Article({ article }) {
  return <ArticleLayout article={article} />;
}

export async function getServerSideProps(context) {
  const article = await getFullArticle(context.params.slug);

  return {
    props: {
      article,
    },
  };
}
