import React from 'react';
// import data from './Logger/data/testData';
import { data }from './Logger/data/realTestData';
import { bigData, longLine } from './Logger/data/bigTestData';
import { Button } from '@patternfly/react-core';
import LoggerIndex from './Logger/LoggerRoot';
import "@patternfly/react-core/dist/styles/base.css";
// data={data.message.payload.console}

/* A very crude example of custom actions that are usable inside of the pre-packaged toolbar */
const customToolbarActions = () => {
  const actionFunc = () => {
    console.log('it works');
  }

  return(
    <Button variant="control" className="searchbar__btn" onClick={() => actionFunc()}>Test</Button>
  );
};

function App() {
  return (
    <div className="root-div">
      &nbsp;
      <LoggerIndex data={[bigData.data, longLine.data, data.data]} />
      &nbsp;
      <Button variant="primary">TESTING MY CSS</Button>
    </div>

  );
}

export default App;
