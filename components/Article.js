import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { API_URL } from "../services/community";
import styles from "../styles/article.module.css";
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
  max-width: 840px;

  margin: -3rem auto 0 auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.darkLight};
`;

const Title = styled.h1`
  margin: 2rem 0;
`;

const AuthorInfos = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`;

const AuthorName = styled.b`
  font-size: 1.2em;
`;

const ArticleDate = styled(Date)`
  color: #cacaca;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
`;

export default function Article({ article }) {
  // Temporary dev env fixes
  const content = article.content.replace(/\/uploads/g, API_URL + "/uploads");
  const coverURL = API_URL + article.cover.url;
  return (
    <>
      <CoverImage src={coverURL} alt={article.cover.caption} />
      <Container>
        <Chip label={"Article Category"} />
        <Title>{article.title}</Title>
        <AuthorInfos>
          <Avatar size={3.5} username={article.author.username} />
          <Column>
            <AuthorName>Thieme Hennis</AuthorName>
            <ArticleDate dateString={article.created_at} />
          </Column>
        </AuthorInfos>

        <div className={styles.article}>
          <ReactMarkdown source={content} />
        </div>
      </Container>
    </>
  );
}

Article.propTypes = { article: PropTypes.object.isRequired };
