import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Button from "../Button";
import UserPreview from "../UserPreview";
import Card from "./Card";

const Container = styled(Card)`
  && {
    flex-direction: column;
    width: unset;
    height: min-content;
    max-width: 744px;
  }

  @media screen and (max-width: ${Breaks.large}) {
    margin: 2rem 0 0 0;
  }
`;

const Description = styled.p`
  max-height: 4.5em;
  max-width: 512px;

  margin: 0 0 1.5rem 0;

  line-height: 1.5em;

  overflow: hidden;
  text-overflow: ellipsis;
`;

const Sep = styled.div`
  display: block;

  height: 1px;
  width: 96px;

  margin: 1.5rem 0;

  background-color: ${(props) => props.theme.greyDark};
`;

const ViewButton = styled(Button)`
  && {
    width: 100%;
    margin: 0;
  }
`;

export default function AuthorCard({ author, ...props }) {
  return (
    <Container {...props}>
      <UserPreview user={author} />
      <Sep />
      <Description>{author.description}</Description>
      <Link passHref href="/users/[username]" as={`/users/${author.username}`}>
        <ViewButton label={"View Profile"} color="primary" />
      </Link>
    </Container>
  );
}

AuthorCard.propTypes = {
  /**
   * object containing the author information
   */
  author: PropTypes.object.isRequired,
};
