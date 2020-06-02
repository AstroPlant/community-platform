import Head from "next/head";
import FAQCard from "../../components/Cards/FAQCard";
import FAQGrid from "../../components/FAQGrid";
import Layout from "../../components/Layout";
import { getCategoriesIds, getFAQsofCategory } from "../../lib/community";

export default function FAQ({ query }) {
  console.log(query);
  return (
    <div className="container">
      <Layout title={"General"}>
        <FAQGrid>
          {query.data.category.faqs.map((faq) => (
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

export async function getStaticPaths() {
  const paths = await getCategoriesIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
  const query = await getFAQsofCategory(1);

  return {
    props: {
      query,
    },
  };
}
