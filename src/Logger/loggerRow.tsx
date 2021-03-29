import React, { useState, useEffect, memo } from 'react';
import { LOGGER_LINE_NUMBER_INDEX_DELTA } from './utils/constants';
import classNames from 'classnames';
import './styles/loggerRow.styles.scss';

interface LoggerRowProps extends React.Props<HTMLElement> {
  index: number;
  style?: React.CSSProperties;
  data: {
    parsedData: any;
    rowInFocus: number;
    highlightedRowIndexes: Array<number>;
    setHighlightedRowIndexes: (indexes: Array<number>) => void;
  };
};

const LoggerRow: React.FC<LoggerRowProps> = memo(({ index, style, data }) => {
    const { parsedData, rowInFocus, highlightedRowIndexes, setHighlightedRowIndexes } = data; // setRowInFocus was part of the params
    const [ clickCounter, setClickCounter ] = useState(0);
    const [ isHiglighted, setIsHiglighted ] = useState(false);

    useEffect(() => {
        let currentHighlightedIndexes = [];
        currentHighlightedIndexes = highlightedRowIndexes;
        let temp = 0;

        if (isHiglighted && clickCounter > 0) {
            currentHighlightedIndexes.push(index);
            setHighlightedRowIndexes(currentHighlightedIndexes);
        }
        else if (!isHiglighted && clickCounter > 0) {
            temp = currentHighlightedIndexes.indexOf(index);
            currentHighlightedIndexes.splice(temp, 1);
            setHighlightedRowIndexes(currentHighlightedIndexes);
        }
    }, [ clickCounter ]);

    useEffect(() => {
      const highlightIndex = highlightedRowIndexes.indexOf(index);
      highlightIndex === -1 ? setIsHiglighted(false) : setIsHiglighted(true);
    }, []);

    const getData = (index) => {
        return parsedData[ index ]; // Can use this function to later add wrapping for syntax highlighting (basic)
    };

    const getRowIndex = (index) => {
        return (index + LOGGER_LINE_NUMBER_INDEX_DELTA);
    };

    const handleHighlightRow = () => {
        const counter = clickCounter + 1;
        setClickCounter(counter);
        setIsHiglighted(!isHiglighted);
    };

    const rowClassname = classNames('ins-logger-row cell__data-column', // Need to rename this, as it's still reflecting the old grid layout. 
        {
            'cell--highlighted': isHiglighted
        },
        {
            'cell--inFocus': index === rowInFocus 
        }
    );

    return (
        <div style={ style }
            className='ins-logger-row'
            onClick={ () => handleHighlightRow() } // had a parameter: index
        >
            <span className='ins-logger-row cell__index-column'>
                { getRowIndex(index) }
            </span>
            <span
                className={ rowClassname }
                onClick={ () => handleHighlightRow() }
            >
                { getData(index) }
            </span>
        </div>
    );
});

export default LoggerRow;
