import React, { useState, useRef, useEffect, useReducer } from 'react';
import { InputGroup, Button, TextInput, Toolbar, ToolbarItem, ToolbarContent } from '@patternfly/react-core';
import { SearchIcon, DownloadIcon, ExpandIcon, ExternalLinkAltIcon, PlayIcon, ExportIcon } from '@patternfly/react-icons';
import {  } from '@patternfly/react-core';
// import { LoggerReducer } from './loggerContext';
import { LoggerToolbarProps } from './loggerToolbar';
import "./styles/loggerToolbar.styles.scss";

interface ToolbarInputGroup extends LoggerToolbarProps {
  customToolbarActions?: () => React.ReactNode | React.ReactNode[]; 
  includesFullScreen?: boolean;
  includesPlay?: boolean;
  includesLaunchExternal?: boolean;
  includesDownload?: boolean;
  includesCustomActions?: boolean;
  handleClear: () => void;
  handleNextSearchItem: () => void;
  handlePrevSearchItem: () => void;
}

const ToolbarInputGroup: React.FC<ToolbarInputGroup> = ({
  includesFullScreen = true,
  includesPlay = true,
  includesLaunchExternal = true,
  includesDownload = true,
  includesCustomActions = true,
  customToolbarActions = null,
}) => {
  const [value, setValue] = useState('search');
  const ref = useRef(null);

  useEffect(() => {

  }, [value]); 

  return (
    <div>
      <InputGroup >
        <InputGroup className="toolbar__default-actions">
          { includesPlay && (
              <Button variant="control" className="searchbar__btn">
                <PlayIcon />
              </Button>
          )}
          { includesFullScreen && (
              <Button variant="control" className="searchbar__btn">
                <ExpandIcon />
              </Button>
          )}
          { includesDownload && (
              <Button variant="control" className="searchbar__btn">
                <DownloadIcon />
              </Button>
          )}
          { includesLaunchExternal && (
              <Button variant="control" className="searchbar__btn">
                <ExternalLinkAltIcon />
              </Button>
          )}
        </InputGroup>
        { customToolbarActions && (
            <InputGroup>
              { customToolbarActions() }
            </InputGroup>
        )}
        <InputGroup>
          <TextInput 
            id="searchBar" 
            type="search" 
            aria-label="Search for string" 
            value={value} 
            onChange={input => setValue(input)} 
            ref={ref}
            className="toolbar__searchbar"
          />
          {/* <SearchInput
            placeholder='Search'
            value={value}
            onChange={input => setValue(input)}
            onClear={() => console.log('bye')}
            resultsCount={`${0} / ${0}`}
            onNextClick={() => console.log('bye')}
            onPreviousClick={() => console.log('bye')}
            className="toolbar__searchbar"
          /> */}
          <Button variant="control" className="searchbar__btn">
            <SearchIcon />
          </Button>
        </InputGroup>  
      </InputGroup>
    </div>
  )
}

export default ToolbarInputGroup;
