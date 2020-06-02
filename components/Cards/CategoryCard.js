import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Card from "./Card";
import WrapInLink from "../WrapInLink";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default function CategoryCard({ className, title }) {
  const as = "/help/" + title.toLowerCase();

  return (
    <WrapInLink href="/help/[name]" as={as}>
      <Container className={className}>
        <h3>{title}</h3>
      </Container>
    </WrapInLink>
  );
}

CategoryCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

CategoryCard.defaultProps = {};
