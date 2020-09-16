import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import AlbumIcon from "../../public/icons/Album.svg";
import ArticleIcon from "../../public/icons/article.svg";
import LinkIcon from "../../public/icons/external-link.svg";
import FileIcon from "../../public/icons/file.svg";
import TutorialIcon from "../../public/icons/tutorial.svg";
import Breaks from "../../utils/breakpoints";
import Date from "../Date";
import Icon from "../Icon";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  && {
    padding: 0;
  }

  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${Breaks.medium}) {
    align-items: center;

    max-height: 96px;
  }
`;

const CoverHolder = styled.div`
  position: relative;
  z-index: 0;

  display: flex;

  overflow: hidden;
  height: 256px;

  @media screen and (max-width: ${Breaks.medium}) {
    display: none;
  }
`;

const FloatingIcon = styled(Icon)`
  position: absolute;
  z-index: 1;

  top: 1rem;
  right: 1rem;

  padding: 0.5rem;
  margin: 0;

  background-color: ${(props) => props.theme.dark};
  border-radius: ${(props) => props.theme.radiusMax};
`;

const InfoHolder = styled.div`
  display: flex;
  flex-direction: column;

  border-top: 1px solid ${(props) => props.theme.primary};

  padding: 1rem;
`;

const MediaTitle = styled.b`
  max-height: 20px;

  margin-bottom: 0.5rem;

  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 18px;
  line-height: 20px;
  white-space: nowrap;
`;

export default function LibraryMediaCard({ className, media }) {
  // Checking for cover and replacing placeholders
  let cover = {
    url: media.cover
      ? process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL + media.cover.url
      : "/images/placeholder.jpg",
    caption: media.cover
      ? media.cover.caption
      : "A plant sprout growing out of the ground.",
  };

  return (
    <WrapInLink
      href={"/library/medias/[slug]"}
      as={`/library/medias/${media.slug}`}
    >
      <Container animateOnHover className={className}>
        <CoverHolder>
          <img src={cover.url} alt={cover.caption} />
          <FloatingIcon color="primary" size={26}>
            {media.type === "album" && <AlbumIcon />}
            {media.type === "article" && <ArticleIcon />}
            {media.type === "links" && <LinkIcon />}
            {media.type === "files" && <FileIcon />}
            {media.type === "tutorial" && <TutorialIcon />}
          </FloatingIcon>
        </CoverHolder>
        <InfoHolder>
          <MediaTitle>{media.title}</MediaTitle>
          <Date dateString={media.created_at} />
        </InfoHolder>
      </Container>
    </WrapInLink>
  );
}

LibraryMediaCard.propTypes = {
  /**
   * Object containing the media information
   */
  media: PropTypes.object.isRequired,
};
