import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding: 1rem;
  width: 100%;
`;

const HeadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const CardInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.b`
  margin-right: 1rem;
`;

const Subtitle = styled.i`
  text-transform: italic;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.primary};
  margin-top: 2px;

  width: auto;
  max-width: 256px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  margin-top: 1rem;
`;

export default function KitInformationCard(props) {
  return (
    <Container>
      <HeadRow>
        <CardInfos>
          <Title>{props.title}</Title>
          <Subtitle>{props.subtitle}</Subtitle>
        </CardInfos>
        <Button label={"Change"} color={"#56F265"} />
      </HeadRow>
      {props.children && (
        <ChildrenContainer>{props.children}</ChildrenContainer>
      )}
    </Container>
  );
}

KitInformationCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

KitInformationCard.defaultProps = {
  subtitle: "",
};
