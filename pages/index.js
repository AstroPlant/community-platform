import styled from "styled-components";
import ChallengeCard from "../components/cards/ChallengeCard";
import DashboardLinkCard from "../components/cards/DashboardLinkCard";
import HelpCard from "../components/cards/HelpCard";
import KitCard from "../components/cards/KitCard";
import MapCard from "../components/cards/MapCard";
import DashboardGrid from "../components/grids/DashboardGrid";
import PageLayout from "../components/layouts/PageLayout";
import { getLoggedUser, useAuth } from "../providers/Auth";
import NewsIcon from "../public/icons/campaign.svg";
import HelpIcon from "../public/icons/help.svg";
import LibraryIcon from "../public/icons/library.svg";
import SlackIcon from "../public/icons/slack.svg";
import Breaks from "../utils/breakpoints";

const WelcomeMessage = styled.h1`
  margin: 4rem 0 0.25rem 0;

  @media screen and (max-width: ${Breaks.large}) {
    margin: 1.5rem 0 0.25rem 0;
  }
`;

function Home({ mainKit }) {
  const { user, isLogged } = useAuth();

  return (
    <PageLayout
      metaTitle={"Home"}
      metaDescription={
        "AstroPlant platform. Grow with the community, manage your kits. Growing a new generation of urban and space farmers."
      }
    >
      <WelcomeMessage>
        Welcome
        {isLogged && ` ${user.firstName ? user.firstName : user.username}`}!
      </WelcomeMessage>

      <DashboardGrid>
        <KitCard home kit={mainKit} />
        <DashboardLinkCard
          href={"/news"}
          icon={<NewsIcon />}
          title={"Astro' News"}
          description={
            "The official blog of the astroplant core team! Everything you need to know about the project in one place."
          }
        />
        <ChallengeCard />
        <HelpCard
          iconSVG={<HelpIcon />}
          iconSize={48}
          title={"Help"}
          href={"/help"}
        />
        <HelpCard
          iconSVG={<SlackIcon />}
          iconSize={96}
          title={"Ask the community!"}
          href="http://astroplant.slack.com/"
        />
        <MapCard />
        <DashboardLinkCard
          href={"/library"}
          icon={<LibraryIcon />}
          title={"AstroPlant Library"}
          description={
            "Documentation, tutorials, research, community highlights... Everything you need to get started with AstroPlant !"
          }
        />
      </DashboardGrid>
    </PageLayout>
  );
}

export async function getServerSideProps() {
  let mainKit = {};

  return {
    props: {
      mainKit: mainKit || null,
    },
  };
}

export default Home;
