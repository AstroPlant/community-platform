import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { useSnackBars } from "../providers/SnackBarProvider";
import CloseIcon from "../public/icons/close.svg";
import ErrorIcon from "../public/icons/error.svg";
import SuccessIcon from "../public/icons/success.svg";
import Card from "./Cards/Card";
import Icon from "./Icon";

const Container = styled(Card)`
  && {
    position: fixed;
    z-index: 999;
    bottom: 2rem;
    left: 2rem;

    align-items: center;

    width: calc(100% - 4rem);
    height: unset;

    padding: 1rem;

    background-color: ${(props) =>
      props.type === "success" ? props.theme.primary : props.theme.error};
    color: ${(props) =>
      props.type === "success" ? props.theme.dark : props.theme.light};

    animation: slide-up 0.2s ease;

    &--delete {
      opacity: 0;
      transform: translateY(2rem);
    }

    @keyframes slide-up {
      0% {
        opacity: 0;
        transform: translateY(2rem);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const Message = styled.p`
  font-weight: 500;
`;

const TypeIconHolder = styled(Icon)`
  align-self: end;
  margin: 0 2rem 0 0;
`;

const CloseIconHolder = styled(Icon)`
  display: flex;
  align-self: end;
  margin: 0 0 0 auto;
`;

export default function SnackBar({ alert }) {
  const { removeAlert } = useSnackBars();

  return (
    <Container type={alert.type}>
      {alert.type === "success" ? (
        <TypeIconHolder size={24} color="dark">
          <SuccessIcon />
        </TypeIconHolder>
      ) : (
        <TypeIconHolder size={24} color="light">
          <ErrorIcon />
        </TypeIconHolder>
      )}
      <Message>{alert.message}</Message>
      <CloseIconHolder
        size={24}
        color={alert.type === "success" ? "dark" : "light"}
        onClick={() => removeAlert(alert.message)}
      >
        <CloseIcon />
      </CloseIconHolder>
    </Container>
  );
}

SnackBar.propTypes = {
  /**
   * Object containing a type and a message to be displayed
   */
  alert: PropTypes.object.isRequired,
};

SnackBar.defaultProps = {};
