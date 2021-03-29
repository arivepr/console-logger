import React, { useEffect, useState, memo, useContext, useReducer}  from 'react';
import { VariableSizeList as List, areEqual } from 'react-window';
import LoggerRow from './loggerRow';
import LoggerToolbar from './loggerToolbar';
import {LoggerContextProvider} from './LoggerContext';
import memoize from 'memoize-one';
import { LOGGER_ROW_HEIGHT, LOGGER_HEIGHT, LOGGER_WIDTH } from './utils/constants'; // Anyway to calculate this dynamically with jsx? Figure it out.
import { isArrayOfString } from './utils/utils';
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
  data: string | Array<string>;
  /* This is for developers to just use a straight logger output */
  hasSearchbar?: boolean;
  /* This is for devs who want their own functionality attached to the logger*/
  customToolbar?: boolean;
  /* This is a flag for any post processing on data */ // Need to actually test this, I think it cannot be optional
  parseData?: boolean;
  /* Custom styling for loggers */
  className?: string;
  /* Titles users can provide for their Data Sources */
  dataSourceTitles?: Array<string | null | undefined>; 
  /* This describes custom items devs can add to the integrated search/toolbar */
  customToolbarActions?: () => React.ReactNode | React.ReactNode[]; 
  /* Dev defined method for downloading the output data from logger */
  onDownloading?: () => void;
};

const Logger: React.FC<LoggerProps> = memo(({ 
  data = '',
  className = '',
  hasSearchbar = true,  
  parseData = true,
  customToolbarActions,
  dataSourceTitles,
}) => {
    const [ parsedData, setParsedData ] = useState<Array<string> | null>([]);
    const [ searchedInput, setSearchedInput ] = useState<string | null>('');
    const [ searchedWordIndexes, setSearchedWordIndexes ] = useState<Array<number> | null>([]);
    const [ highlightedRowIndexes, setHighlightedRowIndexes ] = useState<Array<number> | null>([]);
    const [ rowInFocus, setRowInFocus ] = useState<number | null | undefined>();
    const [ currentDataSource, setCurrentDataSource ] = useState<number | null | undefined>(0); 
    const [ dataSourcesAmount, setDataSourcesAmount ] = useState<number | null | undefined>(1);
    const [ dataSourcesTitles, setDataSourcesTitles ] = useState<Array<string | undefined | null>>(['Default']);

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

    /* 
      Parsing depending on whether the data given is a string or a full array of strings 
      Should also take care of verifying the type of data we're taking in the first place. Figure it out. 
    */
    useEffect( () => { 
      if( typeof data === "string") {
        console.log('We have a SINGULAR string!');
        setParsedData(parseConsoleOutput(data));
      }

      else if( isArrayOfString(data)){
        setDataSourcesAmount(data.length);
        setParsedData(parseConsoleOutput(data[currentDataSource]));
      }

    }, []);

    /* This might be causing unnecessary re-renders, do we need this here? */
    useEffect(() => {
      console.log('WARNING: changing data source over to: ', currentDataSource);
      setParsedData(parseConsoleOutput(data[currentDataSource]));
    }, [currentDataSource]);

    useEffect(() => {
      console.log('Testing out changes in my rowInFocus from Logger: ', rowInFocus);
    }, [rowInFocus]);

  /* Necessitates receiving String as a data */
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

    /* 
      Extract this out of the parent component, and figure out a way to decouple of it from the component. It should take an array, and return an array of indexes
      where the searchedInput is found throughout the data array. Should always be searching an array of strings. Look into lazy log for ideas.
    */
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
                scrollToRow={ scrollToRow } // Add to context
                searchedWordIndexes={ searchedWordIndexes }
                setSearchedWordIndexes={ setSearchedWordIndexes }
                searchedInput={ searchedInput }
                setSearchedInput={ setSearchedInput }
                searchForKeyword={ searchForKeyword } // Figure out a way to decouple this from parent component
                customToolbarActions={customToolbarActions} // Need to encapsulate whatever come through with components customized for the logger (logger specific buttons/dropdown/kebabs)
                currentDataSource={currentDataSource}
                setCurrentDataSource={setCurrentDataSource}
                dataSourcesAmount={dataSourcesAmount} // can keep moving this as a prop, immutable variable 
                dataSourceTitles={dataSourcesTitles} // optional prop, should be optional on context as well. 
                setDataSourceTitles={setDataSourcesTitles}
            />
            <List
                className='logger__grid'
                rowHeight={ index => setRowHeight(index) }
                height={ LOGGER_HEIGHT }
                width={"100%"} // Figure out what exactly this translates to
                itemSize={ () => 30 }
                itemCount={ `${ parsedData.length }` }
                itemData={ dataToRender }
                ref={ loggerRef }
            >
                { LoggerRow }
            </List>
          </LoggerContextProvider>
        </div>
      </>
    );
}, areEqual);

export default Logger;
