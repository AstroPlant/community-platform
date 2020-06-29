import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Card from "./Card";
import Icon from "../Icon";
import LinkIcon from "../../public/icons/external-link.svg";
import FileIcon from "../../public/icons/file.svg";
import ArticleIcon from "../../public/icons/article.svg";

const Container = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default function LibraryMediaCard(props) {
  const type = props.media.media[0].__typename.replace(
    "ComponentMediaType",
    ""
  );

  return (
    <Container className={props.className}>
      <Icon color="light" size={20}>
        {type === "Link" && <LinkIcon />}
        {type === "File" && <FileIcon />}
        {type === "Article" && <ArticleIcon />}
      </Icon>

      <b>{props.media.title}</b>
    </Container>
  );
}

LibraryMediaCard.propTypes = {
  media: PropTypes.object.isRequired,
};
