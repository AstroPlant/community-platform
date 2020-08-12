import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import ArticleIcon from "../../public/icons/article.svg";
import LinkIcon from "../../public/icons/external-link.svg";
import FileIcon from "../../public/icons/file.svg";
import { API_URL } from "../../services/community";
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

  @media screen and (max-width: 1024px) {
    flex-direction: unset;
    align-items: center;

    max-height: 96px;
  }
`;

const CoverHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  overflow: hidden;
  max-height: 160px;

  @media screen and (max-width: 1024px) {
    max-height: 96px;
    max-width: 160px;
  }
`;

const PaddedIcon = styled(Icon)`
  padding: 3rem;
`;

const InfoHolder = styled.div`
  display: flex;
  flex-direction: column;

  border-top: 1px solid ${(props) => props.theme.primary};

  padding: 1rem;

  @media screen and (max-width: 1024px) {
    border-top: 0;
  }
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

function PureMediaCard(props) {
  return (
    <Container animateOnHover className={props.className}>
      <CoverHolder>
        {props.media.media[0].cover != undefined ? (
          <img
            src={API_URL + props.media.media[0].cover.url}
            alt={props.media.media[0].cover.caption}
          />
        ) : (
          <PaddedIcon color="primary" size={48}>
            {props.type === "Link" && <LinkIcon />}
            {props.type === "File" && <FileIcon />}
            {props.type === "Article" && <ArticleIcon />}
          </PaddedIcon>
        )}
      </CoverHolder>
      <InfoHolder>
        <MediaTitle>{props.media.title}</MediaTitle>
        <Date dateString={props.media.created_at} />
      </InfoHolder>
    </Container>
  );
}

export default function LibraryMediaCard(props) {
  const media = props.media.media[0];
  const type = media.type.replace("ComponentMediaType", "");

  return (
    <>
      {type === "Link" && (
        <a target="_blank" href={media.url}>
          <PureMediaCard type={type} {...props} />
        </a>
      )}
      {type === "File" && (
        <a target="_parent" href={API_URL + media.file.url}>
          <PureMediaCard type={type} {...props} />
        </a>
      )}
      {type === "Article" && (
        <WrapInLink
          href={"/library/medias/[id]"}
          as={`/library/medias/${props.media.id}`}
        >
          <PureMediaCard type={type} {...props} />
        </WrapInLink>
      )}
    </>
  );
}

LibraryMediaCard.propTypes = {
  /**
   * Object containing the media information
   */
  media: PropTypes.object.isRequired,
};
