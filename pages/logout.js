import withAuth from "../hocs/withAuth";
import { logout, useAuth } from "../providers/Auth";

function LogOut() {
  const { setLogged } = useAuth();

  setLogged(false);
  logout();

  return <p>Disconnecting...</p>;
}

export default withAuth(LogOut);
