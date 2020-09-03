import styled from "styled-components";
import Article from "../../../components/Article";
import ArticleInfos from "../../../components/ArticleInfos";
import Card from "../../../components/cards/Card";
import Grid from "../../../components/grids/Grid";
import PageLayout from "../../../components/layouts/PageLayout";
import WrapInLink from "../../../components/WrapInLink";
import { getLibraryMedia } from "../../../services/community";

const AuthorCard = styled(Card)`
  && {
    height: unset;
    margin: 2rem 0;
  }
`;

export default function CommunityArticlePage({ media }) {
  const article = media.media[0];

  return (
    <PageLayout metaTitle={article.title}>
      <Grid>
        <Article article={article} />
        <div>
          <h3>Author</h3>
          <WrapInLink
            href="/users/[username]"
            as={`/users/${media.author.username}`}
          >
            <AuthorCard>
              <ArticleInfos author={media.author} date={media.created_at} />
            </AuthorCard>
          </WrapInLink>
        </div>
      </Grid>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      media: await getLibraryMedia(context.params.id),
    },
  };
}
