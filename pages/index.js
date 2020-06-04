import ChallengeCard from "../components/Cards/ChallengeCard";
import HelpCard from "../components/Cards/HelpCard";
import KitCard from "../components/Cards/KitCard";
import LibraryCard from "../components/Cards/LibraryCard";
import MapCard from "../components/Cards/MapCard";
import NewsCard from "../components/Cards/NewsCard";
import DashboardGrid from "../components/DashboardGrid";
import Layout from "../components/Layout";
import { getFeaturedArticle } from "../lib/community";
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
