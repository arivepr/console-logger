import React, { useState, useEffect, useContext } from 'react';
import { useLoggerContext } from './LoggerContext';
import { 
  Level, 
  LevelItem, 
} from '@patternfly/react-core';
import ToolbarInputGroup from './ToolbarInputGroup';
import './styles/loggerToolbar.styles.scss';

export interface LoggerToolbarProps extends React.HTMLProps<HTMLDivElement> {
  searchedWordIndexes: Array<number>;
  rowInFocus: number;
  searchedInput: string;
  customToolbarActions?: () => React.ReactNode | React.ReactNode[];
  setSearchedInput: (inputString: string) => void;
  setSearchedWordIndexes: (searchedWordIndexes:Array<number>) => undefined | void;
  searchForKeyword: (keyword:string) => void;
  setRowInFocus: (prevState: undefined | number | undefined) => undefined | void;
  scrollToRow: (searchedRow: number) => void;
};

const LoggerToolbar: React.FC<LoggerToolbarProps> = ({
    searchedWordIndexes,
    setSearchedWordIndexes,
    scrollToRow,
    rowInFocus,
    setRowInFocus,
    setSearchedInput,
    customToolbarActions,
    searchedInput,
    searchForKeyword
}) => {
    const [ userInput, setUserInput ]  = useState('');
    const [ foundWordIndex, setFoundWordIndex ] = useState<number | undefined>(-1);
    const loggerState = useLoggerContext();
    const value = userInput;
    const DEFAULT_FOCUS = -1;
    const DEFAULT_INDEX = 1;
    console.log('Looking at my context object: ', loggerState);

    useEffect(() => {
      if (userInput.length === 0) {
        handleClear();
        return null;
      }

      setSearchedInput(userInput);
    }, [ userInput ]);

    useEffect(() => {
      if( searchedWordIndexes.length >= 1 ){
        setFoundWordIndex(DEFAULT_INDEX);
      }
    }, [ searchedWordIndexes ]);


    const handleClear = () => {
        setUserInput('');
        setSearchedInput('');
        setSearchedWordIndexes([]);
        setRowInFocus(DEFAULT_FOCUS);
    };

    const handleNextSearchItem = () => {
        let oldIndex = searchedWordIndexes.indexOf(rowInFocus);
        let temp = foundWordIndex;

        if (oldIndex >= searchedWordIndexes.length - 1) {
            return null;
        }
   
        setFoundWordIndex(++temp);
        scrollToRow(searchedWordIndexes[foundWordIndex]);
    };

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
                customToolbarActions={customToolbarActions} 
                handleNextSearchItem={handleNextSearchItem} 
                handlePrevSearchItem={handlePrevSearchItem}
                handleClear={handleClear} 
              /> 
            </LevelItem>
        </Level>
    );

};

export default LoggerToolbar;
