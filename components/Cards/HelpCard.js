import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Icon from "../Icon";
import WrapInLink from "../WrapInLink";
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

export default function HelpCard({
  className,
  iconSize,
  iconSVG,
  text,
  href,
  as,
}) {
  return (
    <WrapInLink href={href} as={as}>
      <Container className={className}>
        <ContentRow>
          <Icon color={"#fff"} size={iconSize}>
            {iconSVG}
          </Icon>
          <h3>{text}</h3>
        </ContentRow>
      </Container>
    </WrapInLink>
  );
}

HelpCard.propTypes = {
  className: PropTypes.string,
  iconSize: PropTypes.string.isRequired,
  iconSVG: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  as: PropTypes.string,
};

HelpCard.defaultProps = {
  href: "/",
  as: null,
};
