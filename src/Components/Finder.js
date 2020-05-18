const Finder = (Data, Category, Value) => {
  let SearchResults = [];
  for (let dataIndex = 0; dataIndex < Data.length; dataIndex++) {
    if (Data[dataIndex][Category] == Value) {
      SearchResults.push(Data[dataIndex]);
    }
  }
  return SearchResults.length > 0 ? SearchResults : Data;
};
export default Finder;
