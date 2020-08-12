import styled from "styled-components";
import Article from "../../components/Article";
import ArticleInfos from "../../components/ArticleInfos";
import Button from "../../components/Button";
import ArticleCard from "../../components/cards/ArticleCard";
import Card from "../../components/cards/Card";
import Grid from "../../components/grids/Grid";
import PageLayout from "../../components/layouts/PageLayout";
import { useAuth } from "../../providers/Auth";
import { getFullArticle } from "../../services/community";
import Breaks from "../../utils/breakpoints";

const AuthorCard = styled(Card)`
  && {
    height: unset;
    margin: 2rem 0;
  }
`;

const ToolsHolder = styled.div`
  @media screen and (max-width: ${Breaks.large}) {
    display: none;
  }
`;

const ToolButtonRow = styled(Grid)`
  && {
    grid-template-columns: 1fr 1fr;
    padding: 0.5rem 0;
  }
`;

const ToolButton = styled(Button)`
  && {
    margin: 0;
  }
`;

const RelatedArticle = styled(ArticleCard)`
  && {
    height: unset;
    margin: 1rem 0;
  }
`;

export default function ArticlePage({ article, related }) {
  const { isLogged, user } = useAuth();
  const isOwner = isLogged && article.author.username === user.username;

  return (
    <PageLayout metaTitle={article.title} metaDescription={article.preview}>
      <Grid>
        <Article article={article} />
        <div>
          {isOwner && (
            <ToolsHolder>
              <h3>Tools</h3>
              <ToolButtonRow>
                <ToolButton
                  disabled
                  inverted
                  label="Edit"
                  color="secondaryDark"
                />
                <ToolButton disabled inverted label="Delete" color="error" />
              </ToolButtonRow>
            </ToolsHolder>
          )}
          <h3>Author</h3>
          <AuthorCard>
            <ArticleInfos author={article.author} date={article.published_at} />
          </AuthorCard>
          <h3>Related Article</h3>
          {related.map((a) => (
            <RelatedArticle animateOnHover key={a.id} article={a} />
          ))}
        </div>
      </Grid>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const data = await getFullArticle(context.params.slug);

  return {
    props: {
      article: data.main_article[0],
      related: data.related_articles,
    },
  };
}
