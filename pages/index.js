import { useContext, useEffect } from "react";
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
import { getFullKit, getKitMeasures, getUserDetails, getUserMemberships } from "../services/data-api";
import { measurementCtx } from "../stores/measurements";
import Breaks from "../utils/breakpoints";

const WelcomeMessage = styled.h1`
  margin: 4rem 0 0.25rem 0;

  @media screen and (max-width: ${Breaks.large}) {
    margin: 1.5rem 0 0.25rem 0;
  }
`;

function Home({ mainKit }) {
  const { user, isLogged } = useAuth();
  const measurementsStore = useContext(measurementCtx);

  useEffect(() => {
    if (mainKit) {
      measurementsStore.setSerial(mainKit.serial);
    }
  }, [mainKit, measurementsStore])

  return (
    <PageLayout
      metaTitle={"Home"}
      metaDescription={
        "The AstroPlant community platform. Read the latest astroplant news, share your results and stories with your fellow space farmers! Manage your kits, and find help and support for your kit issues. AstroPlant, growing a new generation of urban and space farmers."
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

export async function getServerSideProps(ctx) {
  let mainKit = null;
  const user = getLoggedUser(ctx.req.headers.cookie);

  let completeUser = null;
  let memberships = null;

  if (user) {
    completeUser = await getUserDetails(user.username);
    memberships = await getUserMemberships(user.username);

    if (Array.isArray(memberships) && memberships[0]?.kit) {
      const kit = await getFullKit(memberships[0].kit.serial);
      kit.measures = await getKitMeasures(memberships[0].kit.serial, {});
      mainKit = kit;
    }
  }

  return {
    props: {
      mainKit: mainKit,
    },
  };
}

export default Home;
