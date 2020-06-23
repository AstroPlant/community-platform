import Link from "next/link";
import { withRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const PathContainer = styled.nav`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;

  font-weight: 550;
  letter-spacing: 0.02em;
  color: ${(props) => (props.active ? props.theme.light : props.theme.grey)};
`;

const SeparatorHolder = styled.b`
  display: ${(props) => (props.active ? "none" : "block")};
  margin: 0 1rem;
`;

/***
 * Returns the word formated to Titlecase
 */
function toTitleCase(word) {
  return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}

/***
 * Returns the steps from the home page
 * a step looks like this :
 * { id: value, active: value, link: value, label: value }
 */
function getSteps(path) {
  const splitPath = path.split("/");

  // Initializing
  let steps = [];
  let link = "";
  steps.push({ id: 0, active: false, link: "/", label: "Home" });

  for (let i = 1; i < splitPath.length; i++) {
    // creating link of type /step1/step2
    let step = splitPath[i];
    link += "/" + step;
    let label = toTitleCase(step);
    let isActive = i === splitPath.length - 1;
    steps.push({ id: i, active: isActive, link: link, label: label });
  }

  return steps;
}

function Path({ router }) {
  const currentPath = router.asPath;
  const steps = getSteps(currentPath);

  return (
    <PathContainer>
      {steps.map((step) => (
        <LinkContainer active={step.active} key={step.id}>
          <Link passHref href={step.link}>
            <a rel="prev" target="_self">
              {step.label}
            </a>
          </Link>

          <SeparatorHolder active={step.active}>{">"}</SeparatorHolder>
        </LinkContainer>
      ))}
    </PathContainer>
  );
}

export default withRouter(Path);
