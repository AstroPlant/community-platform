import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-gap: ${(props) => props.theme.gridGap};
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr 0.5fr 1fr;

  padding: 1rem 0;

  height: 100%;
`;

const Top = styled.div`
  grid-row: 1;
`;

const Mid = styled.div`
  grid-row: 2;
`;

const Bottom = styled.div`
  grid-row: 3;
`;

const TopLeft = styled(Top)`
  grid-column: 1 / span 8;
`;

const TopRight = styled(Top)`
  grid-column: 9 / span 4;
`;

const MidLeft = styled(Mid)`
  grid-column: 1 / span 8;
`;

const MidRight = styled(Mid)`
  grid-column: 9 / span 4;
`;

const BotLeft = styled(Bottom)`
  grid-column: 1 / span 3;
`;

const BotMid = styled(Bottom)`
  grid-column: 4 / span 5;
`;

const BotRight = styled(Bottom)`
  grid-column: 9 / span 4;
`;

export default function DashboardGrid({ children }) {
  const content = React.Children.toArray(children);

  return (
    <GridContainer>
      <TopLeft>{content[0]}</TopLeft>
      <TopRight>{content[1]}</TopRight>
      <MidLeft>{content[2]}</MidLeft>
      <MidRight>{content[3]}</MidRight>
      <BotRight>{content[4]}</BotRight>
      <BotLeft>{content[5]}</BotLeft>
      <BotMid>{content[6]}</BotMid>
    </GridContainer>
  );
}

DashboardGrid.propTypes = {
  children: PropTypes.node,
};
