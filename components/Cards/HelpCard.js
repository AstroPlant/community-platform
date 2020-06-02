import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Icon from "../Icon";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function HelpCard({ className, iconSize, iconSVG, text, href }) {
  return (
    <Container isLink href={href} className={className}>
      <ContentRow>
        <Icon color={"#fff"} size={iconSize}>
          {iconSVG}
        </Icon>
        <h3>{text}</h3>
      </ContentRow>
    </Container>
  );
}

HelpCard.propTypes = {
  className: PropTypes.string,
  iconSize: PropTypes.string,
  iconSVG: PropTypes.node,
  text: PropTypes.string,
  href: PropTypes.string,
};

HelpCard.defaultProps = {
  href: "/",
};
