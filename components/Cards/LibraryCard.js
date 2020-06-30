import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Card from "./Card";
import Link from "next/link";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

const TitleRow = styled.div`
  flex: 1;
`;

const LibrariesContainer = styled.div`
  flex: 10;
  width: 100%;
  margin: 1rem 0;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ButtonRow = styled.div`
  flex: 1;
`;

const LibraryHolder = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 2rem 1rem;
  margin: 0 1rem;

  background-color: ${(props) => props.theme.dark};
`;

const LibraryName = styled.div`
  font-size: 20px;
  font-weight: 550;
`;

const ShowAllButton = styled(Button)`
  && {
    margin: auto;
  }
`;

export default function LibraryCard(props) {
  return (
    <Container>
      <TitleRow>
        <h3>AstroPlant Library</h3>
      </TitleRow>
      <LibrariesContainer>
        {props.featuredLibraries.map((library) => (
          <LibraryHolder key={library.id}>
            <LibraryName>{library.title}</LibraryName>
          </LibraryHolder>
        ))}
      </LibrariesContainer>
      <ButtonRow>
        <Link passHref href={"/library"}>
          <ShowAllButton label={"Explore"} color={"primary"}></ShowAllButton>
        </Link>
      </ButtonRow>
    </Container>
  );
}

LibraryCard.propTypes = {
  /* the librairies featured on the homepage */
  featuredLibraries: PropTypes.arrayOf(PropTypes.object).isRequired,
};
