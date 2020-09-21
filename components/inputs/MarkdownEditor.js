import React from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import styles from "../../styles/markdown.module.css";

export default function MarkdownEditor(props) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  function changeTab() {
    if (selectedTab === "write") {
      setSelectedTab("preview");
    } else {
      setSelectedTab("write");
    }
  }

  return (
    <ReactMde
      {...props}
      selectedTab={selectedTab}
      onTabChange={changeTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(
          <ReactMarkdown source={markdown} className={styles.md} />
        )
      }
    />
  );
}
