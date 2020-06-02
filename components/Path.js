import { withRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import HeaderLink from "./HeaderLink";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(HeaderLink)`
  && {
    margin: 0;
    color: ${(props) => (props.active ? props.theme.light : props.theme.grey)};
    &:after {
      display: none;
    }
  }
`;

const Sep = styled.b`
  display: ${(props) => (props.active ? "none" : "block")};
  color: ${(props) => props.theme.grey};
  margin: 0 1rem;
`;

const Separator = ({ active }) => {
  return <Sep active={active}>></Sep>;
};

/***
 * Returns the word formated to Titlecase
 */
function toTitleCase(word) {
  return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}

/***
 * Returns the steps from the home page
 */
function getSteps(path) {
  const splitPath = path.split("/");
  splitPath.shift();

  let steps = [];
  steps.push({ active: false, path: "/", name: "Home" });

  let link = "";

  for (let step of splitPath) {
    link += "/" + step;
    let name = toTitleCase(step);
    let isActive = path === link;
    steps.push({ active: isActive, path: link, name: name });
  }

  return steps;
}

function Path({ router }) {
  const currentPath = router.asPath;
  const steps = getSteps(currentPath);

  return (
    <Container>
      {steps.map((step, i) => (
        <>
          <NavLink
            active={step.active}
            key={i}
            href={step.path}
            label={step.name}
          />
          <Separator active={step.active} />
        </>
      ))}
    </Container>
  );
}

export default withRouter(Path);
