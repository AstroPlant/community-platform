import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../utils/breakpoints";
import Avatar from "./Avatar";
import Date from "./Date";

const AuthorInfos = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`;

const AvatarHolder = styled(Avatar)`
  @media screen and (max-width: ${Breaks.large}) {
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

const Column = styled.div`
  margin-left: 1.25rem;
`;

export default function ArticleInfos({ author, date, ...props }) {
  const hasFullName = author.firstName && author.lastName;

  return (
    <AuthorInfos {...props}>
      <AvatarHolder size={64} avatar={author.avatar} />
      <Column>
        <AuthorName>
          {hasFullName
            ? `${author.firstName} ${author.lastName}`
            : author.username}
        </AuthorName>
        <Date dateString={date} />
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
