import HelpCard from "../components/Cards/HelpCard";
import HelpSectionCard from "../components/Cards/HelpSectionCard";
import HelpGrid from "../components/HelpGrid";
import Layout from "../components/Layout";
import { getFAQCategories } from "../lib/community";
import SlackIcon from "../public/icons/slack.svg";

export default function Help({ query }) {
  console.log(query);
  return (
    <div className="container">
      <Layout title={"How can we help you, Matt ?"}>
        <HelpGrid>
          {query.data.categories.map((category) => (
            <HelpSectionCard title={category.name} key={category.id} />
          ))}
          <HelpCard
            iconSVG={<SlackIcon />}
            iconSize={"72px"}
            text={"Ask the community!"}
            href={"/help"}
          />
        </HelpGrid>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  // fetch no longer needs to be imported from isomorphic-unfetch
  const query = await getFAQCategories();

  return {
    props: {
      query,
    },
  };
}
