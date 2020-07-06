import { useRouter } from "next/router";
import { loggedIn, useAuth } from "../providers/Auth";
import LoadingAnimation from "../components/LoadingAnimation";
import styled from "styled-components";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

function DefaultLoadingFallback() {
  return (
    <Center>
      <LoadingAnimation message={"Loading..."} />
    </Center>
  );
}

/**
 * Support client-side conditional redirecting based on the user's
 * authenticated state.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param LoadingComponent The component that will be rendered while
 * the auth state is loading.
 * @param expectedAuth Whether the user should be authenticated for
 * the component to be rendered.
 * @param location The location to redirect to.
 */
export default function withAuthRedirect({
  WrappedComponent,
  LoadingComponent = DefaultLoadingFallback,
  expectedAuth,
  location,
}) {
  const WithAuthRedirectWrapper = (props) => {
    const router = useRouter();
    const { isLoading } = useAuth();
    const onClientSide = typeof window !== "undefined";

    if (isLoading) {
      return <LoadingComponent />;
    }

    if (onClientSide && expectedAuth !== loggedIn()) {
      router.push(location);
      return <></>;
    }

    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirectWrapper;
}
