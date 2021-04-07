import React, { useState, useEffect } from 'react';
import { useLoggerContext } from '../LoggerRoot/LoggerContext';
import { 
  Level, 
  LevelItem, 
} from '@patternfly/react-core';
import ToolbarInputGroup from '../ToolbarInputGroup';
import { NUMBER_INDEX_DELTA } from '../utils/constants';
import '../styles/loggerToolbar.styles.scss';

export interface LoggerToolbarProps extends React.HTMLProps<HTMLDivElement> {
  dataSourcesAmount: number;
  dataSourceTitles?: Array<string | null | undefined>;
  customToolbarActions?: () => React.ReactNode | React.ReactNode[];
  scrollToRow: (searchedRow: number) => void;
 };

const LoggerToolbar: React.FC<LoggerToolbarProps> = ({
    scrollToRow,
    customToolbarActions,
    dataSourcesAmount,
}) => {
    // const [currentSearchItemCount, setCurrentStepItemCount] = useState(1);
    const loggerState = useLoggerContext();
    const {
      searchedWordIndexes,
      setSearchedWordIndexes,
      rowInFocus,
      setRowInFocus,
      currentDataSource,
      setSearchedInput,
      dataSourceTitles,
      setDataSourceTitles,
      foundWordIndex,
      setFoundWordIndex,
    } = loggerState;
    const DEFAULT_FOCUS = -1;
    const DEFAULT_INDEX = 0;

    /* Defaulting the first focused row that contain searched keywords */
    useEffect(() => {
      if( searchedWordIndexes.length >= 1 ){
        setFoundWordIndex(DEFAULT_INDEX);
      }

      // if( searchedWordIndexes.length < 1 ) {
      //   setSearchedWordIndexes([]);
      //   setRowInFocus(DEFAULT_FOCUS);;
      // }
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

    /* Clearing out the search input */
    const handleClear = () => {
        setSearchedInput('');
        setFoundWordIndex(0);
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
        // <Level className='logger__toolbar'>
        //     <LevelItem className='toolbar__searchbar-group'>
              <ToolbarInputGroup
                scrollToRow={scrollToRow}
                customToolbarActions={customToolbarActions} 
                handleNextSearchItem={handleNextSearchItem} 
                handlePrevSearchItem={handlePrevSearchItem}
                handleClear={handleClear} 
                dataSourcesAmount={dataSourcesAmount}
              /> 
        //     </LevelItem>
        // </Level>
    );

};

export default LoggerToolbar;
