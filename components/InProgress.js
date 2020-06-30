import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "../components/Icon";
import ToolsIcon from "../public/icons/tools.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnimatedIcon = styled(Icon)`
  position: relative;

  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-10px);
    }
    100% {
      transform: translatey(0px);
    }
  }
`;

const InfoTitle = styled.h3`
  margin: 1rem 0 1.5rem 0;
`;

const Details = styled.p`
  text-align: center;
  max-width: 512px;
`;

export default function InProgress(props) {
  return (
    <Container>
      <AnimatedIcon size={96} color={"primary"}>
        <ToolsIcon />
      </AnimatedIcon>
      <InfoTitle>{props.title}</InfoTitle>
      {props.details && <Details>{props.details}</Details>}
    </Container>
  );
}

InProgress.propTypes = {
  /* The title to display under the icon. e.g Work in progress */
  title: PropTypes.string.isRequired,
  /* Description of the work that's being done */
  details: PropTypes.string,
};

InProgress.defaultProps = {
  details: null,
};
