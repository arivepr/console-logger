import React from 'react';
import Logger from './logger';
import { LoggerContextProvider } from './LoggerContext';

export interface LoggerProps extends React.Props<HTMLElement> {
  /* String that wil be processed into the logger for output */
  data: string | Array<string>;
  /* Flag for including in the toolbar */
  includesFullscreen?: boolean;
  /* Flag for including in the toolbar */
  includesExternalOpen?: boolean;
  /* Flag for including in the toolbar */
  includesPlayPause?: boolean;
  /* Flag for including in the toolbar */
  includesDownload?: boolean; 
  /* Grouping for custom actions that the user can provide. This is where they would reside */
  customKabob?: React.ReactNode | React.ReactNode[];
  /* This is for developers to just use a straight logger output */
  hasSearchbar?: boolean;
  /* This is for devs who want their own functionality attached to the logger*/
  customToolbar?: boolean | React.ReactNode;
  /* Custom styling for loggers */
  className?: string;
  /* Titles users can provide for their Data Sources */
  dataSourceTitles?: Array<string | null | undefined>; 
  /* Link to be opened via router whenever a user wants to open the component on new tab */
  externalOpenRouteLink?: string;
  /* User defined method for handling fullscreen action */
  onHandleFullScreen?: () => void;
  /* User defined function to pausing playing information flow into the component */
  onHandlePlayPause?: () => void;
  /* This describes custom items devs can add to the integrated search/toolbar */
  customToolbarActions?: () => React.ReactNode | React.ReactNode[]; 
  /* Dev defined method for downloading the output data from logger */
  onDownloading?: () => void;
  /* Function users can send if they want their own logic for external opening */
  onOpenExternally?: () => void;
};

const LoggerIndex:React.FC<LoggerProps> = ({
  data,
  hasSearchbar = true,
  includesFullscreen = false,
  includesExternalOpen = false,
  includesPlayPause = false,
  includesDownload = false,
  customToolbar = false,
  dataSourceTitles = ['Default'],
  className = '',
  customToolbarActions = () => {},
  onOpenExternally = () => {},
  onDownloading = () => {},
  onHandleFullScreen = () => {},  
}) => {
  /* Of course, still need to get all of the props connected */
  return (
    <>
      <LoggerContextProvider>
        <Logger 
          data={data}
          hasSearchbar={hasSearchbar}
        />
      </LoggerContextProvider>    
    </>
  )
}

export default LoggerIndex
