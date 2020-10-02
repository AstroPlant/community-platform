import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import useModal from "../../utils/useModal";
import Modal from "../Modal";
import Card from "./Card";
import ReactMarkdown from "react-markdown";
import styles from "../../styles/markdown.module.css";

const Container = styled(Card)`
  flex-flow: column;

  text-align: start;
`;

const Name = styled.b`
  width: 100%;
  max-width: 100%;

  max-height: 1.5em;

  margin: 0 0 1em 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Description = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;

  height: 9em;
  max-height: 9em;

  font-size: 15px;
  overflow: hidden;
`;

const FeatureMetaData = styled.div`
  display: flex;
  align-items: center;

  font-size: 14px;
  line-height: 1.5;
  text-transform: uppercase;

  color: ${(props) => props.theme.primary};
`;

export default function FeatureCard({ className, feature }) {
  const { show, toggle } = useModal();
  const date = parseISO(feature.created_at);

  return (
    <>
      <Modal title={feature.name} show={show} handleClose={toggle}>
        <FeatureMetaData>
          <p>
            ID {feature.id} | <b> Posted on {format(date, "MMMM dd, yyyy")} </b>
          </p>
        </FeatureMetaData>

        <ReactMarkdown source={feature.description} className={styles.md} />
      </Modal>

      <Container animateOnHover onClick={() => toggle()} className={className}>
        <Name>{feature.name}</Name>
        <Description>
          <ReactMarkdown source={feature.description} className={styles.md} />
        </Description>
      </Container>
    </>
  );
}

FeatureCard.propTypes = {
  /**
   * Object containing the feature details
   */
  feature: PropTypes.object.isRequired,
  /**
   * Styling class of the container. Used by styled-components.
   */
  className: PropTypes.string,
};
