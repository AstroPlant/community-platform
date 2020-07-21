import { createContext, useContext, useEffect, useState } from "react";

/* Creating a search context
 */
export const SearchContext = createContext({
  params: {},
  setParams: () => {},
  results: null,
  setResults: () => {},
  isLoading: true,
});

// Provider passing the SearchContext to its children
export const SearchProvider = ({ children }) => {
  // passing context values to states to avoid too many rendering
  const [params, setParams] = useState({});
  const [results, setResults] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    function init() {
      if (results) {
        setLoading(false);
      }
    }

    init();
  }, [results]);

  return (
    <SearchContext.Provider
      value={{
        params,
        setParams,
        results,
        setResults,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export function useSearch() {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
}
