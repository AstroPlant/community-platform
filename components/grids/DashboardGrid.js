import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Grid from "./Grid";

const GridContainer = styled(Grid)`
  && {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 2fr 1fr 2fr;

    padding: 1rem 0;

    @media screen and (max-width: ${Breaks.large}) {
      grid-template-columns: unset;
      grid-template-rows: unset;
    }
  }
`;

const ResponsiveGridElement = styled.div`
  @media screen and (max-width: ${Breaks.large}) {
    grid-row: unset !important;
    grid-column: unset !important;
  }
`;

const Top = styled(ResponsiveGridElement)`
  grid-row: 1;
`;

const Mid = styled(ResponsiveGridElement)`
  grid-row: 2;
`;

const Bottom = styled(ResponsiveGridElement)`
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
