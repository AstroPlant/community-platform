import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import AlbumIcon from "../../public/icons/album.svg";
import ArticleIcon from "../../public/icons/article.svg";
import LinkIcon from "../../public/icons/external-link.svg";
import FileIcon from "../../public/icons/file.svg";
import Arrow from "../../public/icons/long-arrow.svg";
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

const DetailsHolder = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;

  background-color: ${(props) => props.theme.textBackground};
`;

const MediaTitle = styled.b`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const MediaDate = styled(Date)`
  font-size: 14px;
  margin-bottom: 0.5rem;
`;

const ReadRow = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  margin-top: 0.25rem;
`;

const ReadLabel = styled.label`
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;

  margin-right: auto;

  letter-spacing: 0.1em;
  color: ${(props) => props.theme.secondary};
`;

const AnimatedArrow = styled(Icon)`
  && {
    margin: 0;
  }

  ${Container}:hover & {
    animation: cta-arrow 1s ease-in-out infinite;
  }
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
        <DetailsHolder>
          <MediaDate dateString={media.created_at} />
          <MediaTitle>{media.title}</MediaTitle>
          <ReadRow>
            <ReadLabel>
              {(media.type === "article" || media.type === "tutorial") &&
                "Read"}
              {(media.type === "album" ||
                media.type === "files" ||
                media.type === "links") &&
                "View"}
            </ReadLabel>
            <AnimatedArrow size={32} color={"secondary"}>
              <Arrow />
            </AnimatedArrow>
          </ReadRow>
        </DetailsHolder>
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
