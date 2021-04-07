export const isArrayOfString = (array: Array<string>) => {
  
  for (const str in array){
    if(typeof str !== "string"){
      console.log(`Sadly ${str} is not a string :c`);
      return false;
    }
  }

  return true;
};

/* 
  Function responsible for searching throughout logger component, need to setup for proper use anywhere. 
  It should take an array, and return an array of indexes where the searchedInput is found throughout the data array. 
  Should always be searching an array of strings. Look into lazy log for ideas.
*/
export const searchForKeyword = (searchedInput: string, parsedData: Array<string>) => { 
  const searchResults:Array<number | null | undefined> = [];
  let rowIndexCounter:number = 0;
  let keywordIndexPosition:number = 0;
  let lowerCaseRow:string = "";

  for (const row of parsedData) {
      lowerCaseRow = row.toLowerCase();
      keywordIndexPosition = lowerCaseRow.search(searchedInput);

      if (keywordIndexPosition !== -1) {
          searchResults.push(rowIndexCounter);
      }

      rowIndexCounter++;
  }

  if(searchResults.length > 0) {
    // setSearchedWordIndexes([...searchResults]); // testing this for search
    // scrollToRow(searchResults[DEFAULT_SEARCH_INDEX]);
    return [...searchResults]; 
  }

  else if(searchResults.length <= 0) {
    const negativeResults:Array<number> = [];
    negativeResults.push(-1);

    // Returning an array with nothing but a -1 as a flag for search fail to whatever is calling.
    return negativeResults;  
  }
};

/* Function to search for a specific row index on the logger. */
export const searchForIndex = (searchedInput: string, totalRows: Array<number>) => {
  if (searchedInput.match('[:][1-9]\d*')) {
      const splitInput = searchedInput.split(':');
      const offsetIndex = parseInt(splitInput[1]) - 1;
      // What to do from here, given that we want to separate logger functionality from string/index search here on the search util


      // scrollToRow(offsetIndex); // Needs input validation/Clean Up for readability later
      // setSearchedInput('');
      return;
  }
  return;
};

/* 
  Necessitates receiving String as a data. 
  This needs to be prepped as well to be used from the logger without a problem.
  The user can also provider their own parsing methods if they want to experiment with passing data straight into the logger with their own format.  
*/
export const parseConsoleOutput = (data:string) => {
  const stringToSplitWith = '\n';
  const cleanString = data.split(stringToSplitWith);
  // console.log('Testing data before parsing: ', data);
  // console.log('Testing this after splitting the string: ', cleanString);

  // if (parseData) {
  //   return cleanUpStringArray(cleanString);
  // }
  
  return cleanString;
};

export const inputValidation = (inputString: string) => {
  if(inputString.length >= 3 ){
    return true;
  }
  else
    return false;
};

  /* 
     Old search function for reference. Only smol differences, keeping just until I finish testing. 
  */
  // Once confirmed as working, delete it. 
  // const searchForKeyword = () => { 
  //     const searchResults = [];
  //     let rowIndexCounter = 0;
  //     let keywordIndexPosition = 0;
  //     let lowerCaseRow = "";

  //     if (searchedInput.match('[:][1-9]\d*')) {
  //         const splitInput = searchedInput.split(':');
  //         const offsetIndex = parseInt(splitInput[1]) - 1;
  //         scrollToRow(offsetIndex); // Needs input validation/Clean Up for readability later
  //         setSearchedInput('');
  //         return;
  //     }

  //     for (const row of parsedData) {
  //         lowerCaseRow = row.toLowerCase();
  //         keywordIndexPosition = lowerCaseRow.search(searchedInput);

  //         if (keywordIndexPosition !== -1) {
  //             searchResults.push(rowIndexCounter);
  //         }

  //         rowIndexCounter++;
  //     }

  //     if(searchResults.length > 0) {
  //       setSearchedWordIndexes([...searchResults]); // testing this for search
  //       scrollToRow(searchResults[DEFAULT_SEARCH_INDEX]);
  //     }

  //     else if(searchResults.length <= 0) {
  //       setRowInFocus(-1);
  //     }
  // };