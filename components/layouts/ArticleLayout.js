import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import Avatar from "../Avatar";
import Date from "../Date";
import Header from "../Header";
import Path from "../Path";

const Content = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;
`;

const CoverImage = styled.img`
  max-height: 50vh;
`;

const PageLayout = styled.div`
  margin: auto;
  padding: 2rem;

  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: ${(props) => props.theme.gridGap};
  align-items: flex-start;
`;

const AuthorInfos = styled.div`
  display: flex;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateAndName = styled(Column)`
  margin-left: 1rem;
`;

const Separator = styled.div`
  display: block;
  height: 1px;
  width: auto;
  background-color: ${(props) => props.theme.grey};
  margin: 1rem 0;
`;

export default function ArticleLayout({ article }) {
  return (
    <>
      <Header />
      <Content>
        <Path />

        <CoverImage
          src={"http://localhost:1337" + article.cover.url}
          alt={article.cover.caption}
        />
        <PageLayout>
          <div>
            <h1>{article.title}</h1>
            <ReactMarkdown source={article.content} />
          </div>
          <Column>
            <AuthorInfos>
              <Avatar size={3} username={article.author.username} />
              <DateAndName>
                <b>{article.author.username}</b>
                <Date dateString={article.created_at} />
              </DateAndName>
            </AuthorInfos>
            <Separator />
          </Column>
        </PageLayout>
      </Content>
    </>
  );
}

ArticleLayout.propTypes = {
  article: PropTypes.object.isRequired,
};
