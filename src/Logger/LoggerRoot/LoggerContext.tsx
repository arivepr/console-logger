import React, { createContext, useState, useContext } from 'react';

export const useLoggerContext = () => {
  return useContext(LoggerContext);
};

export interface LoggerContextInterface {
  searchedInput: string | null | undefined;
  rowInFocus: number | null | undefined;
  foundWordIndex: number | null | undefined;
  searchedWordIndexes: Array<number | null | undefined>;
  highlightedRowIndexes: Array<number | null | undefined>;
  currentDataSource: number | null | undefined;
  dataSourceTitles: Array<string | null | undefined>;
  setCurrentDataSource?: (index: number) => void;
  setDataSourceTitles?: (dataTitles: Array<string | null>) => void;
  setRowInFocus?: (index: number) => void;
  setSearchedInput: (input: string) => void;
  setFoundWordIndex?: (index: number) => void;
  setHighlightedRowIndexes: (indexes: Array<number>) => void;
  setSearchedWordIndexes: (indexes: Array<number>) => void;
};

const LoggerContext = createContext<LoggerContextInterface | null>(null);

export const LoggerContextProvider = ({ children }) => {
  const [ searchedInput, setSearchedInput ] = useState<string | null>('');
  const [ rowInFocus, setRowInFocus ] = useState<number | null>(null);
  const [ foundWordIndex, setFoundWordIndex ] = useState<number | undefined | null>(-1);
  const [ searchedWordIndexes, setSearchedWordIndexes ] = useState<Array<number> | null>([])
  const [ highlightedRowIndexes, setHighlightedRowIndexes ] = useState<Array<number> | null>([]);
  const [ currentDataSource, setCurrentDataSource ] = useState<number | null | undefined>(0); 
  const [ dataSourceTitles, setDataSourceTitles ] = useState<Array<string | null | undefined>>(['Default']); 

  return (
    <LoggerContext.Provider value={{
      searchedInput,
      rowInFocus,
      dataSourceTitles,
      foundWordIndex,
      searchedWordIndexes,
      highlightedRowIndexes,
      currentDataSource,
      setCurrentDataSource,
      setDataSourceTitles,  
      setRowInFocus,
      setSearchedInput,
      setFoundWordIndex,
      setHighlightedRowIndexes,
      setSearchedWordIndexes,
    }}>
      {children}
    </LoggerContext.Provider>
  );
};

export const LoggerContextConsumer = LoggerContext.Consumer;
export default LoggerContext;