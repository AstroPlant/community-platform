import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import Date from "./Date";

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

const Column = styled.div`
  margin-left: 1.25rem;
`;

export default function ArticleInfos(props) {
  const hasFullName = props.author.firstName && props.author.lastName;

  return (
    <AuthorInfos className={props.className}>
      <Avatar size={64} username={props.author.username} />
      <Column>
        <AuthorName>
          {hasFullName
            ? `${props.author.firstName} ${props.author.lastName}`
            : props.author.username}
        </AuthorName>
        <ArticleDate dateString={props.date} />
      </Column>
    </AuthorInfos>
  );
}

ArticleInfos.propTypes = {
  /* object containing the author information */
  author: PropTypes.object.isRequired,
  /* publication data of the article */
  date: PropTypes.string.isRequired,
};
