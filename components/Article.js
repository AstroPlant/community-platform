import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { API_URL } from "../services/community";
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

const Content = styled.div`
  margin: 2rem 0;

  color: #f3f3f3;

  & h1,
  & h2 {
    margin: 2rem 0 1rem 0;
  }

  & h3,
  & h4 {
    margin: 1rem 0;
  }

  & h1 {
    font-size: 32px;
  }

  & h2 {
    font-size: 26px;
  }

  & h3 {
    font-size: 20px;
  }

  & h4,
  & h5 {
    font-size: 16px;
  }

  & h6 {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  & p,
  & a,
  & u,
  & li {
    font-size: 14px;
    font-weight: 300;
  }

  & p,
  & a,
  & u {
    margin-bottom: 0.75rem;
  }

  & pre {
    width: 100%;
    padding: 2rem;
    margin: 1rem 0;
    background-color: hsla(0, 0%, 100%, 0.1);
    color: #b2d4bc;
    border-radius: 4px;
    overflow: auto;
  }

  & a {
    color: ${(props) => props.theme.primary};
    text-decoration: underline;
  }

  & ul,
  & ol {
    margin: 0.5rem 0 2rem 2rem;
    margin-left: 2em;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
`;

export default function Article({ article }) {
  return (
    <>
      <CoverImage
        src={API_URL + article.cover.url}
        alt={article.cover.caption}
      />
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

        <Content>
          <ReactMarkdown source={article.content} />
        </Content>
      </Container>
    </>
  );
}

Article.propTypes = { article: PropTypes.object.isRequired };
