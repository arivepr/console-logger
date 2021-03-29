export const isArrayOfString = (array: Array<string>) => {
  
  for (const str in array){
    if(typeof str !== "string"){
      console.log(`Sadly ${str} is not a string :c`);
      return false;
    }
  }

  return true;
}