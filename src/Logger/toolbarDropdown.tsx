import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownToggle, DropdownItem, DropdownPosition } from '@patternfly/react-core';
import { useLoggerContext } from './LoggerContext';
import { NUMBER_INDEX_DELTA } from './utils/constants';
import CaretDownIcon from '@patternfly/react-icons/dist/js/icons/caret-down-icon';
import classnames from 'classnames';
import './styles/loggerToolbar.styles.scss';

interface ToolbarDropdownInterface extends React.HTMLProps<HTMLDivElement> {
  dataSourcesAmount: number,
  currentDataSource: number,
  dataSourceTitles?: Array<string>,
  setDataSourceTitles?: (dataTitles: Array<string | null>) => void,
  setCurrentDataSource: (index: number) => void,
}

// contents should be entirely though props, not hardcoded. User can reuse this for whatever they may need. Move specific things to utils?
const ToolbarDropdown: React.FC<ToolbarDropdownInterface> = ({
  dataSourcesAmount = 1,
  currentDataSource = 0,
  setCurrentDataSource,
  dataSourceTitles,
  setDataSourceTitles,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Hacky solution to have here, but it gives the desired output for now. 
  useEffect(() => {
    console.log("ECHALEEEE, aqui tenemos los sources: ", dataSourcesAmount);

    if(dataSourcesAmount <= 1){
      console.log('Gotta hide this mate');
      // should switch using classnames rather than this.
    }
    if(dataSourcesAmount > 1 && dataSourceTitles[currentDataSource] === "Default" ){
      console.log('Creating new default titles for: ', dataSourcesAmount);
      let titleCounter:number = 0;
      let newTitles:Array<string | null| undefined> = [];
      while (titleCounter < dataSourcesAmount){
        newTitles.push(`Data Source ${titleCounter + NUMBER_INDEX_DELTA}`)
        ++titleCounter;
      }

      console.log('RESULTING TITLE ARRAY: ', newTitles);
      setDataSourceTitles(newTitles);
      console.log('RESULTING dataSourceTitles: ', dataSourceTitles);
    }
  }, [dataSourcesAmount]);

  const onSelect = () => {
    setIsOpen(!isOpen);
  };

  const onToggle = (isOpen:boolean) => {
    setIsOpen(isOpen);
  }

  const onDropDownItemAction = (index: number) => {
    console.log('This is the index of the data source Im switching to: ', index);
    setCurrentDataSource(index);
  };

  const dropdownItems = dataSourceTitles.map((title, index) => (<DropdownItem key={index} component="button" onClick={() => onDropDownItemAction(index)}>{title}</DropdownItem>));

  // This follows the example posted over on the PF docs for PF Dropdown
  return (
    <>
      <Dropdown onSelect={()=> onSelect()} id="toggle-id" style={{height: "40px"}}
        toggle={
          <DropdownToggle style={{height: "36px"}} onToggle={onToggle}>
            {dataSourceTitles[currentDataSource]}
          </DropdownToggle>
        }  
        isOpen={isOpen} dropdownItems={dropdownItems}/>
    </>
  )
};

export default ToolbarDropdown
