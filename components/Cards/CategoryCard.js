import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default function CategoryCard({ className, name, slug }) {
  return (
    <WrapInLink href="/help/[slug]" as={`/help/${slug}`}>
      <Container className={className}>
        <h3>{name}</h3>
      </Container>
    </WrapInLink>
  );
}

CategoryCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

CategoryCard.defaultProps = {};
