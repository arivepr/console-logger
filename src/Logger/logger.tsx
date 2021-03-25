import React, { useEffect, useState, memo, useContext, useReducer}  from 'react';
import { VariableSizeList as List, areEqual } from 'react-window';
import LoggerRow from './loggerRow';
import LoggerToolbar from './loggerToolbar';
import {LoggerContextProvider} from './LoggerContext';
// import LoggerFooter from './loggerFooter';
import memoize from 'memoize-one';
import { LOGGER_ROW_HEIGHT, LOGGER_HEIGHT, LOGGER_WIDTH } from './utils/constants';
import './styles/base.scss';
import './styles/logger.styles.scss';
import './styles/styles.css';

// Wrapping multiple variables around memoization to rerender loggerRow only when these change, and to send both through a single obj.
const createLoggerDataItem = memoize((
    parsedData,
    searchedInput,
    loggerRef,
    rowInFocus,
    setRowInFocus,
    highlightedRowIndexes,
    setHighlightedRowIndexes,
    searchedWordIndexes
) => ({
    parsedData,
    searchedInput,
    loggerRef,
    rowInFocus,
    setRowInFocus,
    highlightedRowIndexes,
    setHighlightedRowIndexes,
    searchedWordIndexes
}));

interface LoggerProps extends React.Props<HTMLElement> {
  /* String that wil be processed into the logger for output */
  data: string;
  /* Indication of how we're going to process data */
  typeOfData?: string; // How do we manage this?
  /* This is for developers to just use a straight logger output */
  hasSearchbar?: boolean;
  /* This is for devs who want their own functionality attached to the logger*/
  customToolbar?: boolean;
  /* This is a flag for any post processing on data */ // Need to actually test this, I think it cannot be optional
  parseData?: boolean;
  /* Custom styling for loggers */
  className?: string;
  /* This describes custom items devs can add to the integrated search/toolbar */
  customToolbarActions?: () => React.ReactNode | React.ReactNode[]; 
  /* Dev defined method for downloading the output data from logger */
  onDownloading?: () => void;
  /*  */
};

const Logger: React.FC<LoggerProps> = memo(({ 
  data = '',
  className = '',
  hasSearchbar = true,  
  parseData = true,
  customToolbarActions,
}) => {
    const [ parsedData, setParsedData ] = useState<Array<String> | null>([]);
    const [ searchedInput, setSearchedInput ] = useState<string | null>('');
    const [ searchedWordIndexes, setSearchedWordIndexes ] = useState<Array<number> | null>([]);
    const [ highlightedRowIndexes, setHighlightedRowIndexes ] = useState<Array<number> | null>([]);
    const [ rowInFocus, setRowInFocus ] = useState<number | null | undefined>();

    const DEFAULT_SEARCH_INDEX = 0;
    const loggerRef = React.createRef<any>();
    Logger.displayName = 'Logger';
    const dataToRender = createLoggerDataItem(
        parsedData,
        searchedInput,
        loggerRef,
        rowInFocus,
        setRowInFocus,
        highlightedRowIndexes,
        setHighlightedRowIndexes,
        searchedWordIndexes
    );
 
    const scrollToRow = (searchedRowIndex) => {
        setRowInFocus(searchedRowIndex);
        loggerRef.current.scrollToItem(searchedRowIndex, 'center');

        return true;
    };

    useEffect( () => { 
      setParsedData(parseConsoleOutput(data)); 
      console.log('Seeing our new parsed data: ', parsedData);
    }, []);

    // Necessitates receiving String as a data
  const parseConsoleOutput = (data) => {
      const stringToSplitWith = '\n';
      const cleanString = data.split(stringToSplitWith);
      // console.log('Testing data before parsing: ', data);
      // console.log('Testing this after splitting the string: ', cleanString);
  
      // if (parseData) {
      //   return cleanUpStringArray(cleanString);
      // }
      
      return cleanString;
  };

    /* Will also be separated into its own example section, rather than being part of core functionality */
    const searchForKeyword = () => { 
        const searchResults = [];
        let rowIndexCounter = 0;
        let keywordIndexPosition = 0;
        let lowerCaseRow = "";

        if (searchedInput.match('[:][1-9]\d*')) {
            const splitInput = searchedInput.split(':');
            const offsetIndex = parseInt(splitInput[1]) - 1;
            scrollToRow(offsetIndex); // Needs input validation/Clean Up for readability later
            setSearchedInput('');
            return;
        }

        for (const row of parsedData) {
            lowerCaseRow = row.toLowerCase();
            keywordIndexPosition = lowerCaseRow.search(searchedInput);

            if (keywordIndexPosition !== -1) {
                searchResults.push(rowIndexCounter);
            }

            rowIndexCounter++;
        }

        if(searchResults.length > 0) {
          setSearchedWordIndexes([...searchResults]); // testing this for search
          scrollToRow(searchResults[DEFAULT_SEARCH_INDEX]);
        }

        else if(searchResults.length <= 0) {
          setRowInFocus(-1);
        }
    };

    const setRowHeight = (index) => {
        return index % 2 === 0
            ? LOGGER_ROW_HEIGHT
            : LOGGER_ROW_HEIGHT;
    };

    return (
      <>
        <div className='ins-c-logger'>
          <LoggerContextProvider>
            <LoggerToolbar
                rowInFocus={ rowInFocus }
                setRowInFocus={ setRowInFocus }
                scrollToRow={ scrollToRow }
                searchedWordIndexes={ searchedWordIndexes }
                setSearchedWordIndexes={ setSearchedWordIndexes }
                searchedInput={ searchedInput }
                setSearchedInput={ setSearchedInput }
                searchForKeyword={ searchForKeyword }
                customToolbarActions={customToolbarActions}
            />
            <List
                className='logger__grid'
                rowHeight={ index => setRowHeight(index) }
                height={ LOGGER_HEIGHT }
                width={"100%"}
                itemSize={ () => 30 }
                itemCount={ `${ parsedData.length }` }
                itemData={ dataToRender }
                ref={ loggerRef }
            >
                { LoggerRow }
            </List>
            { /* <LoggerFooter
                highlightedRowIndexes={ highlightedRowIndexes }
                scrollToRow={ scrollToRow }
                setRowInFocus={ setRowInFocus }
            /> */ }
          </LoggerContextProvider>
        </div>
      </>
    );
}, areEqual);

export default Logger;
