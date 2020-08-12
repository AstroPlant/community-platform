import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import Date from "./Date";
import { API_URL } from "../services/community";

const AuthorInfos = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`;

const AvatarHolder = styled(Avatar)`
  @media screen and (max-width: 1024px) {
    && {
      height: 48px;
      width: 48px;
    }
  }
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
      <AvatarHolder
        size={64}
        username={props.author.username}
        imgSrc={API_URL + props.author.avatar.url}
      />
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
  /**
   * object containing the author information
   */
  author: PropTypes.object.isRequired,
  /**
   * publication data of the article
   */
  date: PropTypes.string.isRequired,
};
