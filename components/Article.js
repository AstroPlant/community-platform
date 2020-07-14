import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { API_URL } from "../services/community";
import styles from "../styles/markdown.module.css";
import Avatar from "./Avatar";
import Chip from "./Chip";
import Date from "./Date";

const CoverImage = styled.img`
  position: relative;
  z-index: -1;

  height: 50vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 95%;
  max-width: 744px;

  margin: -3rem auto 0 auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.darkLight};
`;

const Title = styled.h1`
  margin: 2rem 0;
  line-height: 1.2;
`;

const AuthorInfos = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`;

const AuthorName = styled.b`
  text-transform: capitalize;
  font-size: 1.2em;
`;

const ArticleDate = styled(Date)`
  color: ${(props) => props.theme.grey};
`;

const ArticleContainer = styled.div`
  margin: 2rem 0 0 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
`;

const Row = styled.div`
  display: flex;
`;

export default function Article({ article }) {
  // Temporary dev env fixes
  const content = article.content.replace(/\/uploads/g, API_URL + "/uploads");
  const coverURL = API_URL + article.cover.url;
  const hasFullName = article.author.firstName && article.author.lastName;

  return (
    <>
      <CoverImage src={coverURL} alt={article.cover.caption} />
      <Container>
        <Row>
          {article.categories.map((category) => (
            <Chip key={category.id} label={category.title} />
          ))}
        </Row>

        <Title>{article.title}</Title>
        <AuthorInfos>
          <Avatar size={3.5} username={article.author.username} />
          <Column>
            <AuthorName>
              {hasFullName
                ? `${article.author.firstName} ${article.author.lastName}`
                : article.author.username}
            </AuthorName>
            <ArticleDate dateString={article.created_at} />
          </Column>
        </AuthorInfos>
        <ArticleContainer>
          <ReactMarkdown source={content} className={styles.md} />
        </ArticleContainer>
      </Container>
    </>
  );
}

Article.propTypes = { article: PropTypes.object.isRequired };
