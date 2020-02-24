import axios from "axios";
import neatCsv from "neat-csv";

// CSV locations of the stock lists
const NASDAQ_URL =
  "https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download";
const NYSE_URL =
  "https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nyse&render=download";

const downloadFiles = async () => {
  console.log("Downloading files");

  const nasdaqData = await downloadFile(NASDAQ_URL);
  const nyseData = await downloadFile(NYSE_URL);

  console.log("Files downloaded");

  let data = Array<unknown>();
  data = data.concat(await neatCsv(nasdaqData));
  data = data.concat(await neatCsv(nyseData));

  console.log("Data extracted");

  return data;
};

const downloadFile = async (url: string) => {
  let response = await axios({
    url: url,
    method: "GET",
    responseType: "blob"
  });

  return response.data;
};

export default downloadFiles;
