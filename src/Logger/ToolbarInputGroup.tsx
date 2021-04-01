import React, { useState, useRef, useEffect } from 'react';
import { Button, TextInput, SearchInput, Toolbar, ToolbarItem, ToolbarContent, InputGroup } from '@patternfly/react-core';
import { SearchIcon, DownloadIcon, ExpandIcon, ExternalLinkAltIcon, PlayIcon, ExportIcon } from '@patternfly/react-icons';
import { LoggerToolbarProps } from './Toolbar/loggerToolbar';
import ToolbarDropdown from './toolbarDropdown';
import classnames from 'classnames';
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
  includesFullScreen = false,
  includesPlay = false,
  includesLaunchExternal = true,
  includesDownload = false,
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
  } = loggerContext;
  const dropdownItems = [];
  const [value, setValue] = useState('search');
  
  const ref = useRef(null);

  // Need to make sure where this is coming from, not sure why this was added.
  const onSearch = (index:number) => {
    console.log('Checking in on my current inFocus: ', rowInFocus);
    setRowInFocus(index);
  }

  /* Defining how to switch from one data source to another should be done here rather than the lowest lvl */

   return (
    <div>
      <InputGroup >
        <InputGroup className="toolbar__defautl-selector">
          <ToolbarDropdown
            dataSourceTitles={dataSourceTitles}
            setDataSourceTitles={setDataSourceTitles}
            dataSourcesAmount={dataSourcesAmount}
            setCurrentDataSource={setCurrentDataSource}
            currentDataSource={currentDataSource}
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
          <Button variant="control" className="searchbar__btn" onClick={() => onSearch(1)}>
            <SearchIcon />
          </Button>
        </InputGroup>  
      </InputGroup>
    </div>
  );

  // This way the user can use their own custom toolbar items if they want to? via props
  // const toolbarItems = () => {
  //   return(
  //     <>
  //       <ToolbarItem spacer={{default: "spacerMd"}}>
  //           <ToolbarDropdown 
  //             currentDataSource={currentDataSource}
  //             setCurrentDataSource={setCurrentDataSource}
  //             dataSourcesAmount={dataSourcesAmount}  
  //           />
  //       </ToolbarItem>
  //       <ToolbarItem spacer={{default: "spacerLg"}}>
  //         <InputGroup>
  //           <SearchInput value={value} onChange={setValue} onClear={() => setValue('')}/>
  //         </InputGroup>
  //       </ToolbarItem>
  //     </>
  //   );
  // };

  // return (
  //   <>
  //     <Toolbar>
  //       <ToolbarContent>
  //         {toolbarItems()}
  //       </ToolbarContent>        
  //     </Toolbar>
  //   </>
  // );
}

export default ToolbarInputGroup;
