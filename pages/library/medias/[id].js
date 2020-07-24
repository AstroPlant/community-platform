import styled from "styled-components";
import ArticleLayout from "../../../components/layouts/ArticleLayout";
import Article from "../../../components/Article";
import ArticleInfos from "../../../components/ArticleInfos";
import Card from "../../../components/cards/Card";
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
    <ArticleLayout>
      <Article article={article} />
      <div>
        <h3>Author</h3>
        <AuthorCard>
          <ArticleInfos author={media.author} date={media.created_at} />
        </AuthorCard>
      </div>
    </ArticleLayout>
  );
}

export async function getServerSideProps(context) {
  const media = await getLibraryMedia(context.params.id);

  return {
    props: {
      media,
    },
  };
}
