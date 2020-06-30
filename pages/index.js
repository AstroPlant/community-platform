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
import {
  getAllLibrarySections,
  getFeaturedArticle,
} from "../services/community";
import { getFullKit, getUserMemberships } from "../services/data-api";

function Home({ featuredArticle, mainKit, featuredLibraries }) {
  const { user } = useAuth();

  return (
    <BaseLayout>
      <h1 className="title">Welcome, {user.username} !</h1>

      <DashboardGrid>
        <KitCard home kit={mainKit} />
        <NewsCard home featuredArticle={featuredArticle} href={"/news"} />
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
          href={"http://www.astroplant.slack.com/#/"}
        />
        <MapCard href={"/map"} />
        <LibraryCard featuredLibraries={featuredLibraries} />
      </DashboardGrid>
    </BaseLayout>
  );
}

export async function getServerSideProps(ctx) {
  const featuredArticle = await getFeaturedArticle();
  const libraries = await getAllLibrarySections();
  const featuredLibraries = libraries.slice(0, 2);

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
      featuredArticle,
      mainKit,
      featuredLibraries: libraries,
    },
  };
}

export default withAuth(Home);
