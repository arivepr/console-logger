import React, { useEffect, useState, memo }  from 'react';
import { VariableSizeList as List, areEqual } from 'react-window';
import LoggerRow from '../Logger Row/loggerRow';
import LoggerToolbar from '../Toolbar/loggerToolbar';
import { useLoggerContext } from './LoggerContext';
import memoize from 'memoize-one';
import { LOGGER_ROW_HEIGHT, LOGGER_HEIGHT, LOGGER_WIDTH, DEFAULT_FOCUS } from '../utils/constants'; // Anyway to calculate this dynamically with jsx? Figure it out.
import { isArrayOfString, searchForKeyword, searchForIndex } from '../utils/utils';
import "@patternfly/react-core/dist/styles/base.css";
import '../styles/base.scss';
import '../styles/logger.styles.scss';

// Wrapping multiple variables around memoization to rerender loggerRow only when these change, and to send both through a single obj.
const createLoggerDataItem = memoize((
    parsedData,
    loggerRef,
    rowInFocus,
    highlightedRowIndexes,
    setHighlightedRowIndexes,
) => ({
    parsedData,
    loggerRef,
    rowInFocus,
    highlightedRowIndexes,
    setHighlightedRowIndexes,
}));

interface LoggerProps extends React.Props<HTMLElement> {
  /* String that wil be processed into the logger for output */
  data: string | Array<string>;
  /* Flag for including the fullscreen action*/
  includesFullScreen?: boolean;
  /* Flag for including the play/pause action */
  includesPlay?: boolean;
  /* Flag for including the external/newTab action */
  includesLaunchExternal?: boolean;
  /* Flag for download button action */
  includesDownload?: boolean;
  /* This is for developers to just use a straight logger output */
  hasSearchbar?: boolean;
  /* This is for devs who want their own functionality attached to the logger*/
  customToolbar?: boolean;
  /* This is a flag for any post processing on data */
  parseData?: boolean;
  /* Custom styling for loggers */
  className?: string;
  /* Titles users can provide for their Data Sources */
  dataSourceTitles?: Array<string | null | undefined>; 
  /* Link to be opened via router whenever a user wants to open the component on new tab */
  externalOpenRouteLink?: string;
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
    const [ dataSourcesAmount, setDataSourcesAmount ] = useState<number>(1);
    const loggerContext = useLoggerContext();
    const {
      rowInFocus,
      setRowInFocus,
      searchedInput,
      highlightedRowIndexes,
      setHighlightedRowIndexes,
      currentDataSource,
      searchedWordIndexes,
      setSearchedWordIndexes,
    } = loggerContext;
    const DEFAULT_SEARCH_INDEX = 0;
    const loggerRef = React.createRef<any>();
    const dataToRender = createLoggerDataItem(
        parsedData,
        loggerRef,
        rowInFocus,
        highlightedRowIndexes,
        setHighlightedRowIndexes,
    );

    /* Parsing depending on whether the data given is a string or a full array of strings */
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

    /* switching between data sources depending on user selection from toolbar (is not used when the toolbar isn't included) */
    useEffect(() => {
      setParsedData(parseConsoleOutput(data[currentDataSource]));
    }, [currentDataSource]);

    /* Updating searchedResults context state given changes in searched input */
    useEffect(() => {
      let foundKeywordIndexes: Array<number | null | undefined> = [];

      if(searchedInput !== '' && searchedInput.length >= 3) {
        foundKeywordIndexes = searchForKeyword(searchedInput, parsedData);
        
        if(foundKeywordIndexes.length !== 0){
          setSearchedWordIndexes(foundKeywordIndexes);
          scrollToRow(foundKeywordIndexes[DEFAULT_SEARCH_INDEX]);
        }
      }

      if(searchedInput === "" ){
        setRowInFocus(DEFAULT_FOCUS);
      }
    }, [searchedInput]);

    const scrollToRow = (searchedRowIndex) => {
      setRowInFocus(searchedRowIndex); // This might be something we have to move out afterwards.
      loggerRef.current.scrollToItem(searchedRowIndex, 'center');
      return true;
    };

    /* Necessitates receiving String as a data. User should be able to provide their own parsing method, or already parse it prior to adding it here. */
    const parseConsoleOutput = (data) => {
        const stringToSplitWith = '\n';
        const cleanString = data.split(stringToSplitWith);
    
        // if (parseData) {
        //   return cleanUpStringArray(cleanString);
        // }
        
        return cleanString;
    };

    /* Precursor to enabling word-wrapping, leaving alone although it's practically useless atm. */
    const setRowHeight = (index) => {
      return index % 2 === 0
          ? 60 // LOGGER_ROW_HEIGHT
          : 60; // LOGGER_ROW_HEIGHT;
    };

    return (
      <>
        <div className='ins-c-logger'>
            <LoggerToolbar
                scrollToRow={ scrollToRow }
                // searchForKeyword={ searchForKeyword } // Figure out a way to decouple this from parent component
                customToolbarActions={ customToolbarActions } // Need to encapsulate whatever come through with components customized for the logger (logger specific buttons/dropdown/kebabs)
                dataSourcesAmount={dataSourcesAmount } // can keep moving this as a prop, immutable variable 
            />
            <List
                className='logger__grid'
                rowHeight={ index => setRowHeight(index) }
                height={ LOGGER_HEIGHT }
                width={"100%"} // Figure out what exactly this translates to
                itemSize={ () => 30}
                itemCount={ `${ parsedData.length }` }
                itemData={ dataToRender }
                ref={ loggerRef }
            >
                { LoggerRow }
            </List>
        </div>
      </>
    );
}, areEqual);

export default Logger;
