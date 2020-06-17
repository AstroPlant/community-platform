import ChallengeCard from "../components/cards/ChallengeCard";
import HelpCard from "../components/cards/HelpCard";
import KitCard from "../components/cards/KitCard";
import LibraryCard from "../components/cards/LibraryCard";
import MapCard from "../components/cards/MapCard";
import NewsCard from "../components/cards/NewsCard";
import DashboardGrid from "../components/grids/DashboardGrid";
import BaseLayout from "../components/layouts/BaseLayout";
import withAuth from "../hocs/withAuth";
import { getCookieFromHttp, getLoggedUser } from "../providers/Auth";
import HelpIcon from "../public/icons/help.svg";
import SlackIcon from "../public/icons/slack.svg";
import { getFeaturedArticle } from "../services/community";
import { getFullKit, getUserMemberships } from "../services/data-api";

function Home({ article, mainKit }) {
  return (
    <BaseLayout>
      <h1 className="title">Welcome, {getLoggedUser()} !</h1>

      <DashboardGrid>
        <KitCard home kit={mainKit} />
        <NewsCard article={article} href={"/news"} />
        <ChallengeCard />
        <HelpCard
          iconSVG={<HelpIcon />}
          iconSize={"32px"}
          text={"Help"}
          href={"/help"}
        />
        <HelpCard
          iconSVG={<SlackIcon />}
          iconSize={"96px"}
          text={"Ask the community!"}
          href={"/help"}
        />
        <MapCard href={"/map"} />
        <LibraryCard />
      </DashboardGrid>
    </BaseLayout>
  );
}

export async function getServerSideProps(ctx) {
  const article = await getFeaturedArticle();
  const username = getCookieFromHttp(ctx.req.headers.cookie, "username");
  const memberships = await getUserMemberships(username);
  const mainKit = await getFullKit(memberships[0].kit.serial);

  return {
    props: {
      article,
      mainKit,
    },
  };
}

export default withAuth(Home);
