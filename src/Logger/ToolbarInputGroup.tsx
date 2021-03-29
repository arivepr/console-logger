import React, { useState, useRef, useEffect } from 'react';
import { Button, TextInput, SearchInput, Toolbar, ToolbarItem, ToolbarContent, InputGroup } from '@patternfly/react-core';
import { SearchIcon, DownloadIcon, ExpandIcon, ExternalLinkAltIcon, PlayIcon, ExportIcon } from '@patternfly/react-icons';
import { LoggerToolbarProps } from './loggerToolbar';
import ToolbarDropdown from './toolbarDropdown';
import classnames from 'classnames';
import { useLoggerContext } from './LoggerContext';
import "./styles/loggerToolbar.styles.scss";

interface ToolbarInputGroup extends LoggerToolbarProps {
  dataSources?: Array<string>
  includesFullScreen?: boolean;
  includesPlay?: boolean;
  includesLaunchExternal?: boolean;
  includesDownload?: boolean;
  includesCustomActions?: boolean;
  multipleDataSources?: boolean;
  dataSourcesAmount: number;
  dataSourceTitles?: Array<string | null | undefined>;
  customToolbarActions?: () => React.ReactNode | React.ReactNode[]; 
  handleNextSearchItem: () => void;
  handlePrevSearchItem: () => void;
  handleClear: () => void;
  setDataSourceTitles: (dataTitles:Array<string | null>) => void;
}

const ToolbarInputGroup: React.FC<ToolbarInputGroup> = ({
  includesFullScreen = true,
  includesPlay = false,
  includesLaunchExternal = true,
  includesDownload = false,
  includesCustomActions = true,
  customToolbarActions = null,
  dataSourcesAmount,
  currentDataSource = 0,
  setCurrentDataSource,
}) => {
  const loggerContext = useLoggerContext();
  const {
    rowInFocus, 
    setRowInFocus,
    dataSourceTitles,
    setDataSourceTitles
  } = loggerContext;
  const dropdownItems = [];
  const [value, setValue] = useState('search');
  
  const ref = useRef(null);

  const onSearch = (index:number) => {
    console.log('Checking in on my current inFocus: ', rowInFocus);
    setRowInFocus(index);
  }

   return (
    <div>
      <InputGroup >
        <InputGroup className="toolbar__defautl-selector">
          <ToolbarDropdown 
            currentDataSource={currentDataSource}
            setCurrentDataSource={setCurrentDataSource}
            dataSourceTitles={dataSourceTitles}
            dataSourcesAmount={dataSourcesAmount} 
            setDataSourceTitles={setDataSourceTitles} 
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
