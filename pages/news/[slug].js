import styled from "styled-components";
import Article from "../../components/Article";
import ArticleInfos from "../../components/ArticleInfos";
import ArticleCard from "../../components/cards/ArticleCard";
import Card from "../../components/cards/Card";
import ArticleLayout from "../../components/layouts/ArticleLayout";
import { getFullArticle } from "../../services/community";

const AuthorCard = styled(Card)`
  && {
    height: unset;
    margin: 2rem 0;
  }
`;

const RelatedArticle = styled(ArticleCard)`
  && {
    height: 420px;
    margin: 1rem 0;
  }
`;

export default function ArticlePage({ article, related }) {
  return (
    <ArticleLayout>
      <Article article={article} />
      <div>
        <h3>Author</h3>
        <AuthorCard>
          <ArticleInfos author={article.author} date={article.created_at} />
        </AuthorCard>
        <h3>Related Article</h3>
        {related.map((a) => (
          <RelatedArticle article={a} />
        ))}
      </div>
    </ArticleLayout>
  );
}

export async function getServerSideProps(context) {
  const data = await getFullArticle(context.params.slug);
  const article = data.main_article[0];
  const related = data.related_articles;

  return {
    props: {
      article,
      related,
    },
  };
}
