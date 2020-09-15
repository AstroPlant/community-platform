import FAQGrid from "../../components/grids/FAQGrid";
import MainLayout from "../../components/layouts/MainLayout";
import withFallback from "../../hocs/withFallback";
import {
  getHelpSectionsPaths,
  getHelpSectionBySlug,
} from "../../services/community";
import { REVALIDATION_DELAY } from "../../utils/settings";

function HelpSectionPage({ section }) {
  return (
    <MainLayout
      pageTitle={section.title}
      metaTitle={section.title + " Help Section"}
      metaDescription={`All the frequently asked questions about ${section.title}.`}
    >
      <FAQGrid faqs={section.faqs} />
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const sections = await getHelpSectionsPaths();

  return {
    // Generated at build time
    paths: sections.map((section) => {
      return {
        params: {
          slug: section.slug,
        },
      };
    }),
    // Enabling statically generating additional pages after build
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      section: (await getHelpSectionBySlug(params.slug)) || null,
    },
    revalidate: REVALIDATION_DELAY,
  };
}

export default withFallback(HelpSectionPage, "section");
