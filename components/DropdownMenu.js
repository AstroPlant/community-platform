import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const MenuHolder = styled.div`
  position: relative;
`;

const Container = styled.div`
  position: absolute;
  right: 0;

  display: ${(props) => (props.hidden ? "none" : "block")};

  padding: 0.5rem 0;
  margin: 1rem 0;

  background-color: ${(props) => props.theme.darkLight};
  border: 1px solid ${(props) => props.theme.light};

  transition: opacity 0.2s ease-out, transform 0.4s ease;
`;

const Arrow = styled.div`
  display: block;

  position: absolute;
  top: -7px;
  right: 12px;

  width: 12px;
  height: 12px;

  transform: rotate(45deg);
  transform-origin: center;

  background-color: ${(props) => props.theme.darkLight};
  border-left: 1px solid ${(props) => props.theme.light};
  border-top: 1px solid ${(props) => props.theme.light};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  & a,
  & b,
  & p {
    padding: 0 2rem 0 1rem;

    white-space: nowrap;
    line-height: 2;
  }

  & a,
  & p {
    font-weight: 400;
  }

  & b {
    font-weight: 550;
  }

  & p b {
    padding: 0;
  }

  & a:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const DropdownMenu = React.forwardRef((props, ref) => {
  return (
    <MenuHolder tabIndex="-1">
      <Container ref={ref} hidden={props.hidden}>
        <Arrow />
        <Content>{props.children}</Content>
      </Container>
    </MenuHolder>
  );
});

DropdownMenu.propTypes = {
  /**
   * Content to be displayed inside the menu
   */
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Whether or not the menu is visible
   */
  hidden: PropTypes.bool.isRequired,
};

export default DropdownMenu;
