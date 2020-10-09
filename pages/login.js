import Head from "next/head";
import Link from "next/link";
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

const Title = styled.h2`
  text-align: left;

  margin: 0 0 2rem 0;
`;

const Branding = styled(Brand)`
  margin: 0 0 2rem;
`;

const FormHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 22.5rem;
`;

const Separator = styled.div`
  display: block;
  height: 1px;
  width: 100%;
  margin: 2rem auto;
  background-color: ${(props) => props.theme.greyDark};
`;

const ActionButton = styled(Button)`
  margin: 1rem 0;
`;

const RightColumn = styled.div`
  position: relative;

  @media screen and (max-width: ${Breaks.large}) {
    display: none;
  }
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
          content="Login or Sign Up to the AstroPlant Community Platform"
        />
      </Head>

      <SplitLayout>
        <LeftColumn>
          <Branding />

          <FormHolder>
            <Title>{currentForm}</Title>

            {currentForm === "Log In" && <LoginForm />}
            {currentForm === "Sign Up" && <SignUpForm />}

            <Separator />
            <ActionButton
              inverted
              label={label}
              color={"darkLight"}
              onClick={() => toggleForm()}
            />
            <Link passHref href={"/"}>
              <ActionButton
                inverted
                label={"Skip Authentication"}
                color={"secondary"}
              />
            </Link>
          </FormHolder>
        </LeftColumn>
        <RightColumn>
          <img src="./images/login.jpg" alt="A person taking care of plants." />
        </RightColumn>
      </SplitLayout>
    </>
  );
}

export default withoutAuth(Login);
