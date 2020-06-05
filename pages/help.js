import CategoryCard from "../components/cards/CategoryCard";
import HelpCard from "../components/cards/HelpCard";
import HelpGrid from "../components/grids/HelpGrid";
import MainLayout from "../components/layouts/MainLayout";
import SlackIcon from "../public/icons/slack.svg";
import { getFAQCategories } from "../services/community";

export default function Help({ categories }) {
  return (
    <MainLayout pageTitle={"How can we help you, Matt ?"}>
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
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      categories: await getFAQCategories(),
    },
  };
}
