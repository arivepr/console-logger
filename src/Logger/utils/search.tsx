export const searchForKeyword = (searchedInput: string, parsedData: Array<string>) => { 
  const searchResults = [];
  let rowIndexCounter = 0;
  let keywordIndexPosition = 0;
  let lowerCaseRow:string = "";

  // This needs to be extracted to be it's own thing. This is search for index.
  

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
    return searchResults;
  }

  else if(searchResults.length <= 0) {
    const negativeResults:Array<number> = [];
    negativeResults.push(-1);

    // Returning an array with nothing but a -1 as a flag for search fail to whatever is calling.
    return negativeResults;  
  }

  return;
};

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
}