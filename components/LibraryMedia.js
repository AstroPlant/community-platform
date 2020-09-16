import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../utils/breakpoints";
import ContentRenderer from "./articles/ContentRenderer";
import Avatar from "./Avatar";
import Date from "./Date";

const CoverImage = styled.img`
  border-radius: ${(props) => props.theme.radiusMax}
    ${(props) => props.theme.radiusMax} 0 0;

  height: 512px;

  @media screen and (max-width: ${Breaks.medium}) {
    height: 256px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 95%;
  max-width: 744px;

  margin: -3rem auto 0 auto;
  padding: 0;

  background-color: ${(props) => props.theme.darkLight};
  border-radius: ${(props) => props.theme.radiusMax};

  @media screen and (max-width: ${Breaks.small}) {
    width: 100%;
    margin: -3rem 0 0 0;
  }
`;

const ContentHolder = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Information = styled.div`
  display: flex;
  align-items: center;

  font-size: 12px;

  & b {
    margin: 0 1rem;
  }
`;

const Title = styled.h1`
  margin: 2rem 0;
  line-height: 1.2;
`;

const Row = styled.div`
  display: flex;
`;

export default function LibraryMedia({ media }) {
  // Checking for cover and replacing placeholders
  let cover = {
    url: media.cover
      ? process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL + media.cover.url
      : "/images/placeholder.jpg",
    caption: media.cover
      ? media.cover.caption
      : "A plant sprout growing out of the ground.",
  };

  const hasFullName = media.author.firstName && media.author.lastName;

  return (
    <Container>
      <CoverImage src={cover.url} alt={cover.caption} />
      <ContentHolder>
        <Title>{media.title}</Title>
        <Information>
          <Avatar avatar={media.author.avatar} size={32} />
          <b>
            {hasFullName
              ? `${media.author.firstName} ${media.author.lastName}`
              : media.author.username}
          </b>

          <Date dateString={media.created_at} />
        </Information>
        <ContentRenderer content={media.content} />
      </ContentHolder>
    </Container>
  );
}

LibraryMedia.propTypes = {
  /**
   * Object containing the media content to display
   */
  media: PropTypes.object.isRequired,
};
