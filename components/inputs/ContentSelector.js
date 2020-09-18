import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "../../public/icons/add.svg";
import ImageIcon from "../../public/icons/album.svg";
import LinkIcon from "../../public/icons/external-link.svg";
import FileIcon from "../../public/icons/file.svg";
import TextIcon from "../../public/icons/rich-text.svg";
import Card from "../cards/Card";
import Icon from "../Icon";

const InteractiveIcon = styled(Icon)`
  transition: transform ease 0.3s;

  transform: ${(props) => (props.show ? "rotate(45deg)" : "none")};
`;

const Selector = styled(Card)`
  display: ${(props) => (props.show ? "grid" : "none")};
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
`;

const SelectorButton = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 1.5rem;

  cursor: pointer;
  border: 2px solid ${(props) => props.theme.greyDark};
  border-radius: ${(props) => props.theme.radiusMin};

  background-color: ${(props) => props.theme.dark};

  transition: color ease 0.1s, border-color ease 0.1s, fill ease 0.1s;

  &:hover {
    color: ${(props) => props.theme.secondary};
    border-color: ${(props) => props.theme.secondary};

    svg {
      fill: ${(props) => props.theme.secondary};
    }
  }
`;

export default function ContentSelector({ blocs, addBloc }) {
  const [show, setShow] = useState(false);

  function toggleSelector() {
    setShow(!show);
  }

  return (
    <div>
      <InteractiveIcon
        show={show}
        color={"primary"}
        size={48}
        onClick={() => toggleSelector()}
      >
        <AddIcon />
      </InteractiveIcon>
      <Selector show={show}>
        {blocs.map((bloc) => (
          <SelectorButton
            key={bloc.type}
            onClick={() => {
              addBloc(bloc);
              setShow(false);
            }}
          >
            <Icon color={"light"} size={32}>
              {bloc.type === "Link" && <LinkIcon />}
              {bloc.type === "Image" && <ImageIcon />}
              {bloc.type === "RichText" && <TextIcon />}
              {bloc.type === "File" && <FileIcon />}
            </Icon>

            <b>{bloc.type}</b>
          </SelectorButton>
        ))}
      </Selector>
    </div>
  );
}

ContentSelector.propTypes = {
  /**
   * Types of blocs to select from
   */
  blocs: PropTypes.array.isRequired,
  /**
   * Method to add a bloc to the content
   */
  addBloc: PropTypes.func.isRequired,
};
