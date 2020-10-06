import { useEffect, useState } from "react";
import styled from "styled-components";
import Breaks from "./breakpoints";

const TabsContainer = styled.div`
  display: flex;
  align-items: flex-start;

  width: 100%;

  margin: 0 0 1.5rem 0;

  @media screen and (max-width: ${Breaks.small}) {
    flex-direction: column;
    margin: 0 0 0.75rem 0;
  }
`;

const Tab = styled.p`
  font-weight: 450;
  line-height: 1.75;

  margin: 0 1.5rem 0 0;

  cursor: pointer;

  border-bottom: ${(props) =>
    props.active
      ? `2px solid ${props.theme.primary}`
      : `2px solid transparent`};

  color: ${(props) => (props.active ? props.theme.primary : props.theme.light)};

  &:hover {
    color: ${(props) => props.theme.primary};
  }

  @media screen and (max-width: ${Breaks.small}) {
    margin: 0 1.5rem 0.25rem 0;
  }
`;

/**
 * Hooks to use tabs
 * @param {array} tabs an array of containing all the tabs name
 */
export default function useTabs(tabs) {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  useEffect(() => {
    setCurrentTab(tabs[0]);
  }, []);

  const Tabs = () => {
    return (
      <TabsContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab}
            active={currentTab === tab}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabsContainer>
    );
  };

  return {
    currentTab,
    Tabs,
  };
}
