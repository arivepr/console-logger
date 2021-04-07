import React, { useState, useRef, useEffect } from 'react';
import { Button, TextInput, SearchInput, Toolbar, ToolbarItem, ToolbarContent, InputGroup } from '@patternfly/react-core';
import { SearchIcon, DownloadIcon, ExpandIcon, ExternalLinkAltIcon, PlayIcon, ExportIcon } from '@patternfly/react-icons';
import { LoggerToolbarProps } from './Toolbar/loggerToolbar';
import ToolbarDropdown from './toolbarDropdown';
import { useLoggerContext } from './LoggerRoot/LoggerContext';
import "./styles/loggerToolbar.styles.scss";

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
  includesDownload = false,
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
  // const [value, setValue] = useState('');
  const [currentSearchItemCount, setCurrentStepItemCount] = useState(1); // need to have a function not to display these unless there are any found searches

  // This way the user can use their own custom toolbar items if they want to? via props
  const toolbarItems = () => {
    return(
      <>
        <ToolbarItem spacer={{default: "spacerMd"}}>
            <ToolbarDropdown 
              currentDataSource={currentDataSource}
              setCurrentDataSource={setCurrentDataSource}
              dataSourcesAmount={dataSourcesAmount}
              dataSourceTitles={dataSourceTitles}
              setDataSourceTitles={setDataSourceTitles}
            />
        </ToolbarItem>
        <ToolbarItem spacer={{default: "spacerLg"}}>
          <InputGroup>
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
          </InputGroup>
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
        </ToolbarItem>
      </>
    );
  };

  return (
    <>
      <Toolbar inset={{
        default:'insetSm', 
        md:'insetLg'
      }}
      >
        <ToolbarContent>
          {toolbarItems()}
        </ToolbarContent>        
      </Toolbar>
    </>
  );
};

export default ToolbarInputGroup;
