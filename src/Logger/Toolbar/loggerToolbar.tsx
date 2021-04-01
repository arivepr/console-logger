import React, { useState, useEffect } from 'react';
import { useLoggerContext } from '../LoggerRoot/LoggerContext';
import { 
  Level, 
  LevelItem, 
} from '@patternfly/react-core';
import ToolbarInputGroup from '../ToolbarInputGroup';
import '../styles/loggerToolbar.styles.scss';
import { NUMBER_INDEX_DELTA } from '../utils/constants';

export interface LoggerToolbarProps extends React.HTMLProps<HTMLDivElement> {
  dataSourcesAmount: number;
  dataSourceTitles?: Array<string | null | undefined>;
  customToolbarActions?: () => React.ReactNode | React.ReactNode[];
  searchForKeyword: (keyword:string) => void;
  scrollToRow: (searchedRow: number) => void;
 };

const LoggerToolbar: React.FC<LoggerToolbarProps> = ({
    scrollToRow,
    customToolbarActions,
    dataSourcesAmount,
    searchForKeyword,
}) => {
    const [ userInput, setUserInput ]  = useState('');
    const [ foundWordIndex, setFoundWordIndex ] = useState<number | undefined>(-1);
    const loggerState = useLoggerContext();
    const {
      searchedWordIndexes,
      setSearchedWordIndexes,
      rowInFocus,
      setRowInFocus,
      currentDataSource,
      setSearchedInput,
      dataSourceTitles,
      setDataSourceTitles
    } = loggerState;
    const value = userInput;
    const DEFAULT_FOCUS = -1;
    const DEFAULT_INDEX = 1;

    /* Making sure there is no leftover focused/highlighted rows */
    useEffect(() => {
      if (userInput.length === 0) {
        handleClear();
        return null;
      }

      setSearchedInput(userInput);
    }, [ userInput ]);

    /* Defaulting the first focused row that contain searched keywords */
    useEffect(() => {
      if( searchedWordIndexes.length >= 1 ){
        setFoundWordIndex(DEFAULT_INDEX);
      }
    }, [ searchedWordIndexes ]);

    /* Defaulting the names of the dropdown items if the default toolbar */ 
    useEffect(() => {
      if(dataSourcesAmount > 1 && dataSourceTitles[currentDataSource] === "Default" ){
        let titleCounter:number = 0;
        let newTitles:Array<string | null| undefined> = [];
        while (titleCounter < dataSourcesAmount){
          newTitles.push(`Data Source ${titleCounter + NUMBER_INDEX_DELTA}`)
          ++titleCounter;
        }

        setDataSourceTitles(newTitles);
      }
    }, [dataSourcesAmount]);


    const handleClear = () => {
        setUserInput('');
        setSearchedInput('');
        setSearchedWordIndexes([]);
        setRowInFocus(DEFAULT_FOCUS);
    };

    /* Moving focus over to next row containing searched word */
    const handleNextSearchItem = () => {
        let oldIndex = searchedWordIndexes.indexOf(rowInFocus);
        let temp = foundWordIndex;

        if (oldIndex >= searchedWordIndexes.length - 1) {
            return null;
        }
   
        setFoundWordIndex(++temp);
        scrollToRow(searchedWordIndexes[foundWordIndex]);
    };

    /* Moving focus over to next row containing searched word */
    const handlePrevSearchItem = () => {
        let oldIndex = searchedWordIndexes.indexOf(rowInFocus);
        let temp = foundWordIndex;

        if (oldIndex <= 0) {
            return null;
        }

        setFoundWordIndex(--temp);
        scrollToRow(searchedWordIndexes[--temp]);
    };

    return (
        <Level className='logger__toolbar'>
            <LevelItem className='toolbar__searchbar-group'>
              <ToolbarInputGroup
                searchForKeyword={searchForKeyword}
                scrollToRow={scrollToRow}
                customToolbarActions={customToolbarActions} 
                handleNextSearchItem={handleNextSearchItem} 
                handlePrevSearchItem={handlePrevSearchItem}
                handleClear={handleClear} 
                dataSourcesAmount={dataSourcesAmount}
              /> 
            </LevelItem>
        </Level>
    );

};

export default LoggerToolbar;
