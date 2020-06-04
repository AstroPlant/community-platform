import Layout from "../../components/Layout";
import { getFullArticle } from "../../lib/community";

export default function Article({ article }) {
  return (
    <div className="container">
      <Layout>
        <img
          src={"http://localhost:1337" + article.cover.url}
          alt={article.cover.caption}
        />
        <h1>{article.title}</h1>
        <h6>
          {article.author.username} on the {article.created_at}
        </h6>
        <p>{article.content}</p>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log(context);
  const article = await getFullArticle(context.params.slug);

  return {
    props: {
      article,
    },
  };
}
