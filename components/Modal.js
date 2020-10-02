import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Close from "../public/icons/close.svg";
import Breaks from "../utils/breakpoints";
import Card from "./cards/Card";
import Icon from "./Icon";

const Overlay = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;

  z-index: 3;

  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.9);
`;

const ModalContainer = styled(Card)`
  && {
    padding: 0;
    height: unset;
    width: 740px;

    display: flex;
    flex-direction: column;

    @media screen and (max-width: ${Breaks.large}) {
      width: 680px;
      min-height: 470px;
    }

    @media screen and (max-width: ${Breaks.medium}) {
      width: 100%;
      height: 100%;
    }
  }

  & p {
    margin-bottom: 1rem;
  }
`;

const ModalHead = styled.div`
  display: flex;

  background-color: #252525;
  border-bottom: 1px solid ${(props) => props.theme.grey};

  width: 100%;

  padding: 1rem 2rem;
`;

const IconHolder = styled(Icon)`
  && {
    margin: 0 0 0 auto;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Modal = ({ show, handleClose, title, children }) =>
  show
    ? ReactDOM.createPortal(
        <Overlay>
          <ModalContainer>
            <ModalHead>
              <h4>{title}</h4>
              <IconHolder size={24} onClick={() => handleClose()}>
                <Close />
              </IconHolder>
            </ModalHead>
            <ModalContent>{children}</ModalContent>
          </ModalContainer>
        </Overlay>,
        document.body
      )
    : null;

Modal.propTypes = {
  /**
   * Whether or not to show the overlay
   */
  show: PropTypes.bool,
  /**
   * Method to handle the modal closing
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * Content of the overlay
   */
  children: PropTypes.node,
  /**
   * title of the modal
   */
  title: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  show: false,
};

export default Modal;
