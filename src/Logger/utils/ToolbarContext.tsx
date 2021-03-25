import React, { createContext, useContext, useState } from 'react';

export interface LoggerToolbarProps {

};

export interface LoggerToolbarState {
  
}

export interface LOGGER_ACTIONS {
  SEARCH: 'search',
  CLEAR: 'clear',
}

export const LoggerContext = createContext(null);

export const LoggerContextProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState<String | null>('');
  const [includesSearch, setIncludesSearch] = useState<boolean | null>(true);
  const [rowInFocus, setRowInFocus] = useState<number | null>(null);
  const [searchedWordIndexes, setSearchedWordIndexes] = useState<Array<number> | null>([])
  const [ highlightedRowIndexes, setHighlightedRowIndexes ] = useState<Array<number> | null>([]);

  // return (
  //   <ToolbarContext.Provider> 
  //     {children}
  //   </ToolbarContext.Provider>
  // );
};

export const LoggerReducer = (state, action:LOGGER_ACTIONS) => {

};

export const LoggerContextConsumer = LoggerContext.Consumer;
// export const LoggerContextProvider = LoggerContext.Provider;
export default LoggerContext;