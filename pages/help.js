import CategoryCard from "../components/cards/CategoryCard";
import HelpCard from "../components/cards/HelpCard";
import HelpGrid from "../components/grids/HelpGrid";
import MainLayout from "../components/layouts/MainLayout";
import SlackIcon from "../public/icons/slack.svg";
import { getHelpSections } from "../services/community";

export default function Help({ categories }) {
  return (
    <MainLayout pageTitle={"How can we help you, Matt ?"}>
      <HelpGrid>
        {categories.map((category) => (
          <CategoryCard
            name={category.title}
            slug={category.slug}
            key={category.id}
          />
        ))}
        <HelpCard
          iconSVG={<SlackIcon />}
          iconSize={96}
          title={"Ask the community!"}
          href={"http://www.astroplant.slack.com/#/"}
        />
      </HelpGrid>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      categories: await getHelpSections(),
    },
  };
}
