import Head from "next/head";
import Error from "next/error";
import { useRouter } from "next/router";
import styled from "styled-components";
import LoadingAnimation from "../components/LoadingAnimation";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

/**
 * HOC for statically rendered page with fallback activated
 * @param {JSX} WrappedComponent
 * @param {string} propFetched name of the prop to check for redirects
 */
export default function withFallback(WrappedComponent, propFetched) {
  const withFallbackWrapper = (props) => {
    const router = useRouter();

    if (router.isFallback) {
      return (
        <Center>
          <LoadingAnimation message={"Loading Page..."} />
        </Center>
      );
    }

    /**
     * Because we're using fallback: true on static generation next won't automatically redirect to 404
     * when an element doesn't exit on the API, so we're doing it manually here by checking if the prop that
     * is supposed to be fetch exists
     *
     * This includes setting the noindex header because static files always return a status 200
     * but the rendered not found page page should obviously not be indexed
     */
    if (!props[propFetched] || typeof props[propFetched] === "undefined") {
      return (
        <>
          <Head>
            <meta name="robots" content="noindex" />
          </Head>
          <Error statusCode={404} />
        </>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return withFallbackWrapper;
}
