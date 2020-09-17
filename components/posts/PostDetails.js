import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Avatar from "../Avatar";
import Date from "../Date";

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  & b {
    margin: 0 1rem;
  }
`;

const AvatarHolder = styled(Avatar)`
  @media screen and (max-width: ${Breaks.large}) {
    && {
      height: 48px;
      width: 48px;
    }
  }
`;

export default function PostDetails({ author, date, ...props }) {
  const hasFullName = author.firstName && author.lastName;

  return (
    <Container {...props}>
      <AvatarHolder size={32} avatar={author.avatar} />
      <b>
        {hasFullName
          ? `${author.firstName} ${author.lastName}`
          : author.username}
      </b>
      <Date dateString={date} />
    </Container>
  );
}

PostDetails.propTypes = {
  /**
   * object containing the author information
   */
  author: PropTypes.object.isRequired,
  /**
   * publication data of the article
   */
  date: PropTypes.string.isRequired,
};
