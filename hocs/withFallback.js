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
 * @param {} WrappedComponent
 */
export default function withFallback(WrappedComponent) {
  const withFallbackWrapper = (props) => {
    const router = useRouter();

    if (router.isFallback) {
      return (
        <Center>
          <LoadingAnimation message={"Loading..."} />
        </Center>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return withFallbackWrapper;
}
