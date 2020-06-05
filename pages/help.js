import CategoryCard from "../components/cards/CategoryCard";
import HelpCard from "../components/cards/HelpCard";
import HelpGrid from "../components/grids/HelpGrid";
import Layout from "../components/layouts/Layout";
import { getFAQCategories } from "../lib/community";
import SlackIcon from "../public/icons/slack.svg";

export default function Help({ categories }) {
  return (
    <div className="container">
      <Layout title={"How can we help you, Matt ?"}>
        <HelpGrid>
          {categories.map((category) => (
            <CategoryCard
              name={category.name}
              slug={category.slug}
              key={category.id}
            />
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

export async function getServerSideProps() {
  return {
    props: {
      categories: await getFAQCategories(),
    },
  };
}
