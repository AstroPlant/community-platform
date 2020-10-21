import { useState } from "react";
import styled from "styled-components";
import { useSearch } from "../providers/Search";
import Breaks from "../utils/breakpoints";
import Chip from "./Chip";
import Grid from "./grids/Grid";
import SearchBar from "./inputs/SearchBar";
import LoadingAnimation from "./LoadingAnimation";
import SearchResults from "./SearchResults";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

const LargeSearchBar = styled(SearchBar)`
  && {
    height: 56px;
    margin: 2rem 0 1rem 0;
    background-color: ${(props) => props.theme.darkLight};
  }
`;

const SearchGrid = styled(Grid)`
  && {
    grid-template-columns: 1fr 4fr;

    @media screen and (max-width: ${Breaks.medium}) {
      grid-template-columns: unset;
      grid-auto-flow: dense;
    }
  }
`;

const SearchSettingPanel = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: min-content;

  background-color: ${(props) => props.theme.darkLight};
  border-radius: ${(props) => props.theme.radiusMax};
`;

const PanelSubtitle = styled.h4`
  margin: 1rem 0 0 1.5rem;
`;

const SearchFilters = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1rem 0;

  width: 100%;
`;

export default function SearchMenu(props) {
  const search = useSearch();
  const [activeFilter, setActiveFilter] = useState("All");

  let filters = [];
  let totalCount = 0;

  // Getting the number of results total & per type
  if (search.results && search.results.length !== 0) {
    totalCount = Object.keys(search.results)
      .map((key) => {
        filters.push({ name: key, size: search.results[key].length });
        return search.results[key].length;
      })
      .reduce((a, b) => a + b);
  }

  return (
    <>
      <LargeSearchBar />

      <SearchGrid inverted fillHeight>
        <SearchSettingPanel>
          <PanelSubtitle>Filters</PanelSubtitle>
          <SearchFilters>
            <Filter
              activeTab={activeFilter}
              name={"All"}
              size={totalCount}
              onClick={setActiveFilter}
            />
            {filters.map((tab) => (
              <Filter
                key={tab.name}
                activeTab={activeFilter}
                name={tab.name}
                size={tab.size}
                onClick={setActiveFilter}
              />
            ))}
          </SearchFilters>
        </SearchSettingPanel>

        {search.isLoading ? (
          <Center>
            <LoadingAnimation message={"Searching the database..."} />
          </Center>
        ) : (
          <>
            {search.results && (
              <SearchResults
                activeFilter={activeFilter}
                params={search.params}
                results={search.results}
              />
            )}
          </>
        )}
      </SearchGrid>
    </>
  );
}

SearchMenu.propTypes = {};

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem 1.5rem;

  cursor: pointer;

  background-color: ${(props) => props.selected && `rgba(53, 239, 127, 0.1)`};
  color: ${(props) => props.selected && props.theme.primary};
`;

const FilterName = styled.span`
  font-weight: 500;
  text-transform: capitalize;
`;

const NumberChip = styled(Chip)`
  && {
    width: 40px;

    margin: 0 0 0 1rem;
    padding: 2px 0;

    border-radius: 2px;

    font-weight: 500;
    color: ${(props) => props.theme.dark};
  }
`;

function Filter({ activeTab, name, size, onClick }) {
  const selected = activeTab === name;
  return (
    <FilterContainer selected={selected} onClick={() => onClick(name)}>
      <FilterName>{name}</FilterName>
      <NumberChip label={`${size}`} color={selected ? "primary" : "light"} />
    </FilterContainer>
  );
}
