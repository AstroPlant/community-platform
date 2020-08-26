import FAQGrid from "../../components/grids/FAQGrid";
import MainLayout from "../../components/layouts/MainLayout";
import { getHelpSectionBySlug } from "../../services/community";

export default function HelpSectionPage({ section }) {
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

export async function getServerSideProps(context) {
  return {
    props: {
      section: await getHelpSectionBySlug(context.params.slug),
    },
  };
}
