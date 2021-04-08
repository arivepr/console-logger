import React, { useState, useRef, useEffect } from 'react';
import { Button, TextInput, SearchInput, Toolbar, ToolbarItem, ToolbarContent, ToolbarGroup} from '@patternfly/react-core';
import { SearchIcon, DownloadIcon, ExpandIcon, ExternalLinkAltIcon, PlayIcon, ExportIcon } from '@patternfly/react-icons';
import { LoggerToolbarProps } from './loggerToolbar';
import ToolbarDropdown from './toolbarDropdown';
import { useLoggerContext } from '../LoggerRoot/LoggerContext';
import "../styles/loggerToolbar.styles.scss";

interface ToolbarInputGroup extends LoggerToolbarProps {
  includesFullScreen?: boolean;
  includesPlay?: boolean;
  includesLaunchExternal?: boolean;
  includesDownload?: boolean;
  dataSourcesAmount: number;
  dropDownItems?: () => React.ReactNode | React.ReactNode[];
  onSelect?: () => void;
  customToolbarActions?: () => React.ReactNode | React.ReactNode[]; 
  handleNextSearchItem: () => void;
  handlePrevSearchItem: () => void;
  handleClear: () => void;
}

const ToolbarInputGroup: React.FC<ToolbarInputGroup> = ({
  includesFullScreen = true,
  includesPlay = false,
  includesLaunchExternal = true,
  includesDownload = true,
  handleNextSearchItem,
  handlePrevSearchItem,
  customToolbarActions,
  dataSourcesAmount,
  handleClear
}) => {
  const loggerContext = useLoggerContext();
  const {
    rowInFocus, 
    setRowInFocus,
    dataSourceTitles,
    setDataSourceTitles,
    currentDataSource,
    setCurrentDataSource,
    searchedInput,
    setSearchedInput,
    searchedWordIndexes
  } = loggerContext;
  const [currentSearchItemCount, setCurrentStepItemCount] = useState(1); // need to have a function not to display these unless there are any found searches
  
  const toolbarItems = () => {
    return(
      <>
        <ToolbarItem>
            <ToolbarDropdown 
              currentDataSource={currentDataSource}
              setCurrentDataSource={setCurrentDataSource}
              dataSourcesAmount={dataSourcesAmount}
              dataSourceTitles={dataSourceTitles}
              setDataSourceTitles={setDataSourceTitles}
            />
        </ToolbarItem>
        <ToolbarItem>
          <ToolbarGroup>
            <SearchInput 
              placeholder='Search'
              value={searchedInput}
              onNextClick={() => handleNextSearchItem()}
              onPreviousClick={() => handlePrevSearchItem()}
              onClear={() => handleClear()}
              onChange={(input) => setSearchedInput(input)}
              resultsCount={`${currentSearchItemCount} / ${searchedWordIndexes.length}`}
              className="toolbar__searchbar"
            />
          </ToolbarGroup>
        </ToolbarItem>
        <ToolbarGroup alignment={{default: 'alignRight'}}>
          <ToolbarItem>
            { includesPlay && (
              <Button variant="plain" className="searchbar__btn">
                <PlayIcon />
              </Button>
            )}
          </ToolbarItem>
          <ToolbarItem>
            { includesFullScreen && (
              <Button variant="plain" className="searchbar__btn">
                <ExpandIcon />
              </Button>
            )}
          </ToolbarItem>
          <ToolbarItem>
            { includesDownload && (
              <Button variant="plain" className="searchbar__btn">
                <DownloadIcon />
              </Button>
            )}
          </ToolbarItem>
          <ToolbarItem>
            { includesLaunchExternal && (
              <Button variant="plain" className="searchbar__btn">
                <ExternalLinkAltIcon />
              </Button>
            )}
          </ToolbarItem>
        </ToolbarGroup>
      </>
    );
  };

  return (
    <>
      <Toolbar>
        <ToolbarContent>
          {toolbarItems()}
        </ToolbarContent>        
      </Toolbar>
    </>
  );
};

export default ToolbarInputGroup;
