import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import styles from "../../styles/markdown.module.css";
import PostFile from "./PostFile";
import PostImage from "./PostImage";
import PostLink from "./PostLink";

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
            // Completing the address of the images
            const richText = component.text.replace(
              /\/uploads/g,
              process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL + "/uploads"
            );

            return (
              <ReactMarkdown
                key={key}
                source={richText}
                className={styles.md}
              />
            );

          case "ComponentContentTypeImage":
            return <PostImage key={key} image={component} />;

          case "ComponentContentTypeLink":
            return <PostLink key={key} link={component} />;

          case "ComponentContentTypeFile":
            return <PostFile key={key} file={component} />;

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
