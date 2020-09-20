import ChallengeCard from "../components/cards/ChallengeCard";
import HelpCard from "../components/cards/HelpCard";
import KitCard from "../components/cards/KitCard";
import LibraryCard from "../components/cards/LibraryCard";
import MapCard from "../components/cards/MapCard";
import NewsCard from "../components/cards/NewsCard";
import DashboardGrid from "../components/grids/DashboardGrid";
import PageLayout from "../components/layouts/PageLayout";
import { getLoggedUser, useAuth } from "../providers/Auth";
import HelpIcon from "../public/icons/help.svg";
import SlackIcon from "../public/icons/slack.svg";
import { getFeaturedArticle } from "../services/community";
import { getFullKit, getUserMemberships } from "../services/data-api";

function Home({ featuredArticle, mainKit }) {
  const { user, isLogged } = useAuth();

  return (
    <PageLayout
      metaTitle={"Home"}
      metaDescription={
        "AstroPlant platform. Grow with the community, manage your kits. Growing a new generation of urban and space farmers."
      }
      limitWidth={false}
    >
      <h1>
        Welcome
        {isLogged && ` ${user.firstName ? user.firstName : user.username}`}!
      </h1>

      <DashboardGrid>
        <KitCard home kit={mainKit} />
        <NewsCard featuredArticle={featuredArticle} />
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
        <LibraryCard />
      </DashboardGrid>
    </PageLayout>
  );
}

export async function getServerSideProps(ctx) {
  const featuredArticle = await getFeaturedArticle();

  let memberships = [];
  let mainKit = {};

  const user = getLoggedUser(ctx.req.headers.cookie);

  if (user != null) {
    memberships = await getUserMemberships(user.username);
    mainKit =
      memberships.length != 0 && (await getFullKit(memberships[0].kit.serial));
  }

  return {
    props: {
      featuredArticle: featuredArticle || null,
      mainKit: mainKit || null,
    },
  };
}

export default Home;
