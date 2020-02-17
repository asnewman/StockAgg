import downloadFiles from "./downloader";
import extractCsvs from "./extractor";

const getStocks = async () => {
  console.log("*** Getting stocks ***");
  const files = await downloadFiles();
  const data = await extractCsvs(files);
  console.log("*** Done getting stocks ***");

  console.log("*** Cleaning data ***");
  // Remove empty fields and stardardize field names
  const cleanData = data.map((stock: Map<string, unknown>) => {
    const cleanStock = {};
    Object.keys(stock).forEach(key => {
      let newKey = key;

      // Fix lowercase first lettered fields
      if (key[0] == key.charAt(0).toLowerCase()) {
        newKey = key.charAt(0).toUpperCase() + key.slice(1);
      }

      // Only add empty fields
      if (stock[key]) {
        cleanStock[newKey] = stock[key];
      }
    });
    cleanStock["time"] = new Date();

    return cleanStock;
  });
  console.log("*** Done cleaning data ***");
  return cleanData;
};

export { getStocks };
