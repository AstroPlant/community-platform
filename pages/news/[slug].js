import ArticleLayout from "../../components/layouts/ArticleLayout";
import { getFullArticle } from "../../services/community";

export default function Article({ article }) {
  return (
    <div className="container">
      <ArticleLayout article={article} />
    </div>
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
