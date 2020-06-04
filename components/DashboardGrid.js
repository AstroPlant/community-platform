import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import HelpIcon from "../public/icons/help.svg";
import SlackIcon from "../public/icons/slack.svg";
import ChallengeCard from "./Cards/ChallengeCard";
import HelpCard from "./Cards/HelpCard";
import KitCard from "./Cards/KitCard";
import LibraryCard from "./Cards/LibraryCard";
import MapCard from "./Cards/MapCard";
import NewsCard from "./Cards/NewsCard";

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
  return (
    <GridContainer>
      <TopLeft>
        <KitCard kitName={"The Best Kit"} kitType={"Explorer"}></KitCard>
      </TopLeft>
      <TopRight>
        <NewsCard
          title={"Title"}
          description={"description"}
          imgSrc={"/placeholder.jpg"}
          href={"/news"}
        />
      </TopRight>
      <MidLeft>
        <ChallengeCard />
      </MidLeft>
      <MidRight>
        <HelpCard
          iconSVG={<HelpIcon />}
          iconSize={"32px"}
          text={"Help"}
          href={"/help"}
        />
      </MidRight>
      <BotRight>
        <HelpCard
          iconSVG={<SlackIcon />}
          iconSize={"72px"}
          text={"Ask the community!"}
          href={"/help"}
        />
      </BotRight>
      <BotLeft>
        <MapCard></MapCard>
      </BotLeft>
      <BotMid>
        <LibraryCard></LibraryCard>
      </BotMid>
    </GridContainer>
  );
}

DashboardGrid.propTypes = {
  children: PropTypes.node,
};
