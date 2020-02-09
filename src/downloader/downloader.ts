import fs from "fs";
import axios from "axios";

// CSV locations of the stock lists
const NASDAQ_URL =
  "https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download";
const NYSE_URL =
  "https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nyse&render=download";

const DIR = "csv";

const NASDAQ_FILE = `${DIR}/nasdaq.csv`;
const NYSE_FILE = `${DIR}/nyse.csv`;

const downloadFiles = async () => {
  console.log("Downloading files");

  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR);
  }

  downloadFile(NASDAQ_URL, NASDAQ_FILE);
  downloadFile(NYSE_URL, NYSE_FILE);

  console.log("Files downloaded");
  return [NASDAQ_FILE, NYSE_FILE];
};

const downloadFile = async (url: string, fileName: string) => {
  let response = await axios({
    url: url,
    method: "GET",
    responseType: "blob"
  });
  fs.writeFileSync(fileName, response.data);
};

export default downloadFiles;
