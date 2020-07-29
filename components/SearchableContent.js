import PropTypes from "prop-types";
import styled from "styled-components";
import { useSearch } from "../providers/Search";
import LoadingAnimation from "./LoadingAnimation";
import SearchResults from "./SearchResults";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

export default function SearchableContent(props) {
  const { results, params, isLoading } = useSearch();

  return (
    <>
      {results ? (
        <>
          {isLoading ? (
            <Center>
              <LoadingAnimation message={"Searching the database..."} />
            </Center>
          ) : (
            <SearchResults
              params={params}
              results={results}
              resultsType={props.type}
            />
          )}
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
}

SearchableContent.propTypes = {
  /* Node children of the component */
  children: PropTypes.node.isRequired,
  /* type of content to search for */
  type: PropTypes.string.isRequired,
};
