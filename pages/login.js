import styled from "styled-components";
import LoginForm from "../components/forms/LoginForm";
import withoutAuth from "../hocs/withoutAuth";
import Brand from "../components/Brand";

const LoginLayout = styled.div`
  height: 100vh;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const LeftColumn = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.darkLight};
`;

const FormHolder = styled.div`
  width: 100%;
  max-width: 22.5rem;
`;

function Login() {
  return (
    <LoginLayout>
      <LeftColumn>
        <Brand vertical />
        <FormHolder>
          <LoginForm />
        </FormHolder>
      </LeftColumn>
      <img src="./placeholder.jpg" />
    </LoginLayout>
  );
}

export default withoutAuth(Login);
