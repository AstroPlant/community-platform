import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import styles from "../../styles/markdown.module.css";
import ArticleFile from "./ArticleFile";
import ArticleImage from "./ArticleImage";
import ArticleLink from "./ArticleLink";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 2rem 0;
`;

export default function ContentRenderer({ content }) {
  return (
    <Container>
      {content.map((component) => {
        const key = component.type + component.id;
        switch (component.type) {
          case "ComponentContentTypeRichText":
            return (
              <ReactMarkdown
                key={key}
                source={component.text}
                className={styles.md}
              />
            );

          case "ComponentContentTypeImage":
            return <ArticleImage key={key} image={component} />;

          case "ComponentContentTypeLink":
            return <ArticleLink key={key} link={component} />;

          case "ComponentContentTypeFile":
            return <ArticleFile key={key} file={component} />;

          default:
            return null;
        }
      })}
    </Container>
  );
}

ContentRenderer.propTypes = {
  /**
   * Array containing the different components to display
   */
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
};
