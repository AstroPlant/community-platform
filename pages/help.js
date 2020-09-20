import HelpCard from "../components/cards/HelpCard";
import HelpSectionCard from "../components/cards/HelpSectionCard";
import ItemsGrid from "../components/grids/ItemsGrid";
import MainLayout from "../components/layouts/MainLayout";
import SlackIcon from "../public/icons/slack.svg";
import { getHelpSections } from "../services/community";
import { REVALIDATION_DELAY } from "../utils/settings";

export default function Help({ helpSections }) {
  return (
    <>
      <MainLayout
        pageTitle={"How can we help you ?"}
        metaTitle={"Help"}
        metaDescription={
          "Help section of AstroPlant, frequently asked questions, community support."
        }
      >
        <ItemsGrid>
          {helpSections.map((section) => (
            <HelpSectionCard helpSection={section} key={section.id} />
          ))}
          <HelpCard
            iconSVG={<SlackIcon />}
            iconSize={96}
            title={"Ask the community!"}
            href="http://astroplant.slack.com/"
          />
        </ItemsGrid>
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  const helpSections = await getHelpSections();
  return {
    props: {
      helpSections: helpSections || [],
    },
    revalidate: REVALIDATION_DELAY,
  };
}
