import React, { createContext, useState, useContext } from 'react';

export interface LOGGER_ACTIONS {
  type: 'search' | 'clear' | 'changeSearchInput';
  payload?: LoggerContextInterface;
};

// So that we may export the context into any component that needs it
export const useLoggerContext = () => {
  return useContext(LoggerContext);
};

export interface LoggerContextInterface { // Need to figure out how exactly to set this up.
  searchInput: (string | React.Dispatch<React.SetStateAction<string>>)[];
  rowInFocus: (number | null | undefined | React.Dispatch<React.SetStateAction<number>>)[];
  searchedWordIndexes: (Array<number> | React.Dispatch<React.SetStateAction<number[]>>)[];
  highlightedRowIndexes: (Array<number> | React.Dispatch<React.SetStateAction<number[]>>)[];
};

const LoggerContext = createContext<LoggerContextInterface | null>(null);

export const LoggerContextProvider = ({ children }) => {
  const [ searchInput, setSearchInput ] = useState<string | null>('');
  const [ rowInFocus, setRowInFocus ] = useState<number | null>(null);
  const [ searchedWordIndexes, setSearchedWordIndexes ] = useState<Array<number> | null>([])
  const [ highlightedRowIndexes, setHighlightedRowIndexes ] = useState<Array<number> | null>([]);

  const store = {
    searchInput: [searchInput, setSearchInput],
    rowInFocus: [rowInFocus, setRowInFocus],
    searchedWordIndexes: [searchedWordIndexes, setSearchedWordIndexes],
    highlightedRowIndexes: [highlightedRowIndexes, setHighlightedRowIndexes]
  }

  return (
    <LoggerContext.Provider value={store}>
      {children}
    </LoggerContext.Provider>
  );
};

export const LoggerContextConsumer = LoggerContext.Consumer;
export default LoggerContext;