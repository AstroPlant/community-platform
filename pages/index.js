import ChallengeCard from "../components/cards/ChallengeCard";
import HelpCard from "../components/cards/HelpCard";
import KitCard from "../components/cards/KitCard";
import LibraryCard from "../components/cards/LibraryCard";
import MapCard from "../components/cards/MapCard";
import NewsCard from "../components/cards/NewsCard";
import DashboardGrid from "../components/grids/DashboardGrid";
import Layout from "../components/layouts/Layout";
import { getFeaturedArticle } from "../services/community";
import HelpIcon from "../public/icons/help.svg";
import SlackIcon from "../public/icons/slack.svg";

export default function Home({ article }) {
  return (
    <div className="container">
      <Layout home>
        <h1 className="title">Welcome, Matt!</h1>

        <DashboardGrid>
          <KitCard kitName={"The Best Kit"} kitType={"Explorer"} />
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
          <MapCard />
          <LibraryCard />
        </DashboardGrid>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const article = await getFeaturedArticle();

  return {
    props: {
      article,
    },
  };
}
