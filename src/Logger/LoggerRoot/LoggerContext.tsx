import React, { createContext, useState, useContext } from 'react';

export const useLoggerContext = () => {
  return useContext(LoggerContext);
};

export interface LoggerContextInterface {
  searchInput: string | null | undefined;
  rowInFocus: number | null | undefined;
  searchedWordIndexes: Array<number | null | undefined>;
  highlightedRowIndexes: Array<number | null | undefined>;
  currentDataSource: number | null | undefined;
  dataSourceTitles: Array<string | null | undefined>;
  setCurrentDataSource?: (index: number) => void;
  setDataSourceTitles?: (dataTitles: Array<string | null>) => void;
  setRowInFocus?: (index: number) => void;
  setSearchInput: (input: string) => void;
  setHighlightedRowIndexes: (indexes: Array<number>) => void;
  setSearchedWordIndexes: (indexes: Array<number>) => void;
};

const LoggerContext = createContext<LoggerContextInterface | null>(null);

export const LoggerContextProvider = ({ children }) => {
  const [ searchInput, setSearchInput ] = useState<string | null>('');
  const [ rowInFocus, setRowInFocus ] = useState<number | null>(null);
  const [ searchedWordIndexes, setSearchedWordIndexes ] = useState<Array<number> | null>([])
  const [ highlightedRowIndexes, setHighlightedRowIndexes ] = useState<Array<number> | null>([]);
  const [ currentDataSource, setCurrentDataSource ] = useState<number | null | undefined>(); 
  /* Rather than initialize at default, i should init at an empty array and base everything around that opposed to how it is now */
  const [ dataSourceTitles, setDataSourceTitles ] = useState<Array<string | null | undefined>>(['Default']); 

  return (
    <LoggerContext.Provider value={{
      searchInput,
      rowInFocus,
      dataSourceTitles,
      searchedWordIndexes,
      highlightedRowIndexes,
      currentDataSource,
      setCurrentDataSource,
      setDataSourceTitles,  
      setRowInFocus,
      setSearchInput,
      setHighlightedRowIndexes,
      setSearchedWordIndexes,
    }}>
      {children}
    </LoggerContext.Provider>
  );
};

export const LoggerContextConsumer = LoggerContext.Consumer;
export default LoggerContext;