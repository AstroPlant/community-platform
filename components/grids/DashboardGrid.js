import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

const GridContainer = styled(Grid)`
  && {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr 0.5fr 1fr;

    padding: 1rem 0;
  }
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

export default function DashboardGrid(props) {
  const dashboardItems = React.Children.toArray(props.children);

  return (
    <GridContainer fillHeight>
      <TopLeft>{dashboardItems[0]}</TopLeft>
      <TopRight>{dashboardItems[1]}</TopRight>
      <MidLeft>{dashboardItems[2]}</MidLeft>
      <MidRight>{dashboardItems[3]}</MidRight>
      <BotRight>{dashboardItems[4]}</BotRight>
      <BotLeft>{dashboardItems[5]}</BotLeft>
      <BotMid>{dashboardItems[6]}</BotMid>
    </GridContainer>
  );
}

DashboardGrid.propTypes = {
  children: PropTypes.node,
};
