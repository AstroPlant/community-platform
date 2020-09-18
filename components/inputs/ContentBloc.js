import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import ImageIcon from "../../public/icons/album.svg";
import RemoveIcon from "../../public/icons/delete.svg";
import LinkIcon from "../../public/icons/external-link.svg";
import FileIcon from "../../public/icons/file.svg";
import TextIcon from "../../public/icons/rich-text.svg";
import Card from "../cards/Card";
import Icon from "../Icon";

const Bloc = styled(Card)`
  && {
    margin: 4rem 0;
    overflow: visible;
  }
`;

const StartingPoint = styled.span`
  position: absolute;
  z-index: -1;

  top: -2.75rem;
  left: 38px;

  width: 8px;
  height: 8px;

  border-radius: 50%;

  background-color: ${(props) => props.theme.secondary};
`;

const Link = styled.div`
  position: absolute;
  z-index: -1;

  top: ${(props) => (props.isFirst ? "-2.5rem" : "-4rem")};
  left: 41px;

  width: 2px;
  height: 3rem;

  background-color: ${(props) => props.theme.secondary};
`;

const BlocTypeIcon = styled(Icon)`
  && {
    cursor: unset;
    padding: 0.25rem;
    margin: 0;
  }

  position: absolute;
  z-index: 1;

  top: -16px;
  left: 24px;

  border-radius: ${(props) => props.theme.radiusMax};
  border: 2px solid ${(props) => props.theme.darkLight};

  background-color: ${(props) => props.theme.secondary};
`;

const RemoveBlocIcon = styled(Icon)`
  position: absolute;
  z-index: 1;

  top: -1.5rem;
  right: 1rem;

  padding: 0.25rem;
  border-radius: ${(props) => props.theme.radiusMax};
  border: 2px solid ${(props) => props.theme.darkLight};

  background-color: ${(props) => props.theme.error};
`;

const Content = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default function ContentBloc({ bloc, removeBloc, position, children }) {
  const isFirst = position === 0;

  function getIcon() {
    switch (bloc.type) {
      case "Link":
        return <LinkIcon />;
      case "Image":
        return <ImageIcon />;
      case "RichText":
        return <TextIcon />;
      case "File":
        return <FileIcon />;

      default:
        return null;
    }
  }
  return (
    <Bloc>
      {isFirst && <StartingPoint />}
      <Link isFirst={isFirst} />
      <BlocTypeIcon color={"light"} size={24}>
        {getIcon()}
      </BlocTypeIcon>
      <RemoveBlocIcon
        color={"light"}
        size={24}
        onClick={() => removeBloc(bloc.id)}
      >
        <RemoveIcon />
      </RemoveBlocIcon>
      <Content>{children}</Content>
    </Bloc>
  );
}

ContentBloc.propTypes = {
  /**
   * Information about the bloc to render
   */
  bloc: PropTypes.object.isRequired,
  /**
   * Position of the bloc inside the list
   */
  position: PropTypes.number.isRequired,
  /**
   * Method to remove a bloc from the list
   */
  removeBloc: PropTypes.func.isRequired,
  /**
   * Content of the bloc
   */
  children: PropTypes.node.isRequired,
};
