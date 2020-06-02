import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Card from "./Card";

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
    <Container isLink href="/help/[id]" as={as} className={className}>
      <h3>{title}</h3>
    </Container>
  );
}

CategoryCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

CategoryCard.defaultProps = {};
