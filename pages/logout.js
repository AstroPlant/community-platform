import styled from "styled-components";
import LoadingAnimation from "../components/LoadingAnimation";
import withAuth from "../hocs/withAuth";
import { logout, useAuth } from "../providers/Auth";

const Center = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function LogOut() {
  const { setLogged } = useAuth();

  React.useEffect(() => {
    function init() {
      logout();
      setLogged(false);
    }

    init();
  }, []);

  return (
    <Center>
      <LoadingAnimation message="Logging out..." />
    </Center>
  );
}

export default withAuth(LogOut);
