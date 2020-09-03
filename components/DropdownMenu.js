import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../utils/clickListener";

const MenuHolder = styled.div`
  position: relative;
`;

const TriggerHolder = styled.div`
  cursor: pointer;
`;

const Container = styled.ul`
  position: absolute;
  right: 0.5rem;

  display: block;

  padding: 0.5rem 0;
  margin: 1.5rem 0;

  background-color: ${(props) => props.theme.darkLight};
  border-radius: ${(props) => props.theme.radiusMax};
  border: 2px solid rgba(256, 256, 256, 0.5);

  transition: opacity 0.2s ease-out, transform 0.4s ease;
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

const DropdownMenu = ({ trigger, children, ...props }) => {
  const [show, setShow] = useState(false);

  const ref = useRef(null);
  const triggerRef = useRef(null);

  useOutsideClick(ref, triggerRef, close.bind(this));

  /**
   * toggle the menu
   */
  function toggle() {
    setShow(!show);
  }

  /**
   * Closes the menu
   */
  function close() {
    setShow(false);
  }

  return (
    <div>
      <TriggerHolder ref={triggerRef} onClick={() => toggle()}>
        {trigger}
      </TriggerHolder>
      {show && (
        <MenuHolder tabIndex="-1">
          <Container ref={ref} hidden={!show} {...props}>
            <Content>{children}</Content>
          </Container>
        </MenuHolder>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  /**
   * Content to be displayed inside the menu
   */
  children: PropTypes.node.isRequired,
  /**
   * Component that triggers the opening of the menu
   */
  trigger: PropTypes.node.isRequired,
};

export default DropdownMenu;
