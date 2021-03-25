import React from 'react';
import Logger from './Logger/logger';
// import data from './Logger/data/testData';
import { data }from './Logger/data/realTestData';
import { bigData, longLine } from './Logger/data/bigTestData';
import { Button } from '@patternfly/react-core';
import "@patternfly/react-core/dist/styles/base.css";
import './App.css';

// data={data.message.payload.console}

const customToolbarActions = () => {
  const actionFunc = () => {
    console.log('it works');
  }

  return(
    <Button variant="control" className="searchbar__btn" onClick={() => actionFunc()}>Test</Button>
  );
};

function App() {
  console.log('Testing out custom shit', customToolbarActions);
  console.log('Testing out bigData: ', bigData);
  console.log('Testing out longLine data: ', longLine);

  return (
    <div className="root-div">
      {/* <Logger data={data.data} onFullscreen={} onExternalOpen={} /> */}
      <Logger data={bigData.data} customToolbarActions={customToolbarActions} />
      &nbsp;
      <Logger data={longLine.data} />
    </div>

  );
}

export default App;
