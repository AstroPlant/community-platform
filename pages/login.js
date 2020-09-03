import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import Brand from "../components/Brand";
import Button from "../components/Button";
import LoginForm from "../components/forms/LoginForm";
import SignUpForm from "../components/forms/SignUpForm";
import SplitLayout from "../components/layouts/SplitLayout";
import withoutAuth from "../hocs/withoutAuth";
import Breaks from "../utils/breakpoints";

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  padding: 2rem;

  background-color: ${(props) => props.theme.dark};
`;

const RightColumn = styled.div`
  @media screen and (max-width: ${Breaks.large}) {
    display: none;
  }
`;

const FormHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 22.5rem;
`;

const SwitchButton = styled(Button)`
  margin: 2rem 0;
`;

function Login() {
  const [currentForm, setCurrentForm] = useState("Log In");
  const [label, setLabel] = useState("Sign Up");

  function toggleForm() {
    if (currentForm === "Log In") {
      setCurrentForm("Sign Up");
      setLabel("Log In");
    } else {
      setCurrentForm("Log In");
      setLabel("Sign Up");
    }
  }

  return (
    <>
      <Head>
        <title>Login or Sign Up | AstroPlant Platform</title>
        <meta
          name="description"
          content="Login page of the AstroPlant Community Platform"
        />
      </Head>

      <SplitLayout>
        <LeftColumn>
          <Brand vertical />
          <FormHolder>
            {currentForm === "Log In" && <LoginForm />}
            {currentForm === "Sign Up" && <SignUpForm />}

            <SwitchButton
              inverted
              label={label}
              color={"darkLight"}
              onClick={() => toggleForm()}
            />
          </FormHolder>
        </LeftColumn>
        <RightColumn>
          <img src="./placeholder.jpg" />
        </RightColumn>
      </SplitLayout>
    </>
  );
}

export default withoutAuth(Login);
