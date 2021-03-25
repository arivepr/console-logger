---
id: Logger
cssPrefix: pf-c-logger
propComponents: 
  [
    Logger,
    LoggerToolbar,
    LoggerRow,
  ]
section: components
beta: true
---

## Examples

## Basic Logger
```jsx
  import React from 'react';
  import Logger from '@patternfly/react-core';
  import testData from './src/data/testData';

  const LoggerBasicExample = () => {
  return (
    <React.Fragment>
      <Logger title={'Logger Example'} data={testData} />
    </React.Fragment>
  );
};
```

## Including Toolbar
```jsx
import React from 'react';
import Logger from '@patternfly/react-core';
import testData from './src/data/testData.js';

const LoggerToolbarExample = () => {
  return (
    <React.Fragment>
      <Logger title={'Logger Example'} data={testData} hasSearchbar />
    </React.Fragment>
  );
};

export default LoggerExample;
```

## Cleaning logger output
```jsx
import React from 'react';
import Logger from '@patternfly/react-core';
import testData from './src/data/testData.js';

const LoggerToolbarExample = () => {
  
  return (
    <React.Fragment>
      <Logger title={'Logger Example'} data={testData} hasSearchbar />
    </React.Fragment>
  );
};

export default LoggerExample;
```