import ChallengeCard from "../components/cards/ChallengeCard";
import HelpCard from "../components/cards/HelpCard";
import KitCard from "../components/cards/KitCard";
import LibraryCard from "../components/cards/LibraryCard";
import MapCard from "../components/cards/MapCard";
import NewsCard from "../components/cards/NewsCard";
import DashboardGrid from "../components/grids/DashboardGrid";
import BaseLayout from "../components/layouts/BaseLayout";
import withAuth from "../hocs/withAuth";
import { getLoggedUser, useAuth } from "../providers/Auth";
import HelpIcon from "../public/icons/help.svg";
import SlackIcon from "../public/icons/slack.svg";
import { getFeaturedArticle } from "../services/community";
import { getFullKit, getUserMemberships } from "../services/data-api";

function Home({ article, mainKit }) {
  const { user } = useAuth();

  return (
    <BaseLayout>
      <h1 className="title">Welcome, {user.username} !</h1>

      <DashboardGrid>
        <KitCard home kit={mainKit} />
        <NewsCard article={article} href={"/news"} />
        <ChallengeCard />
        <HelpCard
          iconSVG={<HelpIcon />}
          iconSize={"32px"}
          title={"Help"}
          href={"/help"}
        />
        <HelpCard
          iconSVG={<SlackIcon />}
          iconSize={"96px"}
          title={"Ask the community!"}
          href={"http://www.astroplant.slack.com/#/"}
        />
        <MapCard href={"/map"} />
        <LibraryCard />
      </DashboardGrid>
    </BaseLayout>
  );
}

export async function getServerSideProps(ctx) {
  const article = await getFeaturedArticle();
  let memberships = [];
  let mainKit = {};

  const user = getLoggedUser(ctx.req.headers.cookie);

  if (typeof user !== "undefined") {
    memberships = await getUserMemberships(user.username);
    mainKit =
      memberships.length != 0 && (await getFullKit(memberships[0].kit.serial));
  }

  return {
    props: {
      article,
      mainKit,
    },
  };
}

export default withAuth(Home);
