import React from "react";
import styled from "styled-components";
import LibraryIcon from "../../public/icons/library.svg";
import Breaks from "../../utils/breakpoints";
import Icon from "../Icon";
import WrapInLink from "../WrapInLink";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  margin: 0 0 0 1rem;

  @media screen and (max-width: ${Breaks.medium}) {
    width: min-content;
  }
`;

const Description = styled.p`
  margin: 1rem 0;
  max-width: 520px;
`;

export default function LibraryCard(props) {
  return (
    <WrapInLink href={"/library"}>
      <Container animateOnHover>
        <TitleRow>
          <Icon size={48}>
            <LibraryIcon />
          </Icon>
          <Title>AstroPlant Library</Title>
        </TitleRow>
        <Description>
          Documentation, tutorials, research, community highlights... Everything
          you need to get started with AstroPlant !
        </Description>
      </Container>
    </WrapInLink>
  );
}
