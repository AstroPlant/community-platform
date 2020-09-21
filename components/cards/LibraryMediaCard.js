import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import AlbumIcon from "../../public/icons/album.svg";
import ArticleIcon from "../../public/icons/article.svg";
import LinkIcon from "../../public/icons/external-link.svg";
import FileIcon from "../../public/icons/file.svg";
import TutorialIcon from "../../public/icons/tutorial.svg";
import Cover from "../Cover";
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
`;

const CoverHolder = styled(Cover)`
  position: relative;
  z-index: 0;

  height: 256px;
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

  padding: 1rem;
`;

const MediaTitle = styled.b`
  max-height: 20px;

  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 18px;
  line-height: 20px;
  white-space: nowrap;
`;

const MediaDate = styled(Date)`
  font-size: 14px;
  margin-bottom: 0.5rem;
`;

export default function LibraryMediaCard({ className, media }) {
  return (
    <WrapInLink
      href={"/library/medias/[slug]"}
      as={`/library/medias/${media.slug}`}
    >
      <Container animateOnHover className={className}>
        <CoverHolder cover={media.cover}>
          <FloatingIcon color="primary" size={26}>
            {media.type === "album" && <AlbumIcon />}
            {media.type === "article" && <ArticleIcon />}
            {media.type === "links" && <LinkIcon />}
            {media.type === "files" && <FileIcon />}
            {media.type === "tutorial" && <TutorialIcon />}
          </FloatingIcon>
        </CoverHolder>
        <InfoHolder>
          <MediaDate dateString={media.created_at} />
          <MediaTitle>{media.title}</MediaTitle>
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
