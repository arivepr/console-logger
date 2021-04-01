import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownToggle, DropdownItem, DropdownPosition } from '@patternfly/react-core';
import { useLoggerContext } from './LoggerRoot/LoggerContext';
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
  /* Prop for any user defined function for using the dropdown select */
  onDropDownSelect?: () => void,
}

/* 
  Most of the functionality is currently baked in to this component. This will be cleaned out to reduce bloat
*/
const ToolbarDropdown: React.FC<ToolbarDropdownInterface> = ({
  dataSourcesAmount = 1,
  currentDataSource = 0,
  setCurrentDataSource,
  dataSourceTitles,
  setDataSourceTitles,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = () => {
    setIsOpen(!isOpen);
  };

  const onToggle = (isOpen:boolean) => {
    setIsOpen(isOpen);
  }

  const onDropDownItemAction = (index: number) => {
    setCurrentDataSource(index);
  };



  const dropdownItems = dataSourceTitles.map((title, index) => (<DropdownItem key={index} component="button" onClick={() => onDropDownItemAction(index)}>{title}</DropdownItem>));

  return (
    <>
      <Dropdown onSelect={()=> onSelect()} id="toggle-id" style={{height: "40px"}}
        toggle={
          <DropdownToggle style={{height: "36px"}} onToggle={onToggle}>
            {dataSourceTitles[currentDataSource]}
          </DropdownToggle>
        }  
        isOpen={isOpen}
        dropdownItems={dropdownItems}
      />
    </>
  )
};

export default ToolbarDropdown;
