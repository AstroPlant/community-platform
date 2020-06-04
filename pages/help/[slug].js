import FAQCard from "../../components/Cards/FAQCard";
import FAQGrid from "../../components/FAQGrid";
import Layout from "../../components/Layout";
import { getAllCategoriesSlug, getCategoryBySlug } from "../../lib/community";

export default function FAQ({ category }) {
  return (
    <div className="container">
      <Layout title={category.name}>
        <FAQGrid>
          {category.faqs.map((faq) => (
            <FAQCard
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              date={faq.created_at}
            />
          ))}
        </FAQGrid>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const category = await getCategoryBySlug(context.params.slug);

  return {
    props: {
      category,
    },
  };
}