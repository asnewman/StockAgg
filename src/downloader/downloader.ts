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

  let response = await axios({
    url: NASDAQ_URL,
    method: "GET",
    responseType: "blob"
  });
  fs.writeFileSync(NASDAQ_FILE, response.data);

  response = await axios({
    url: NYSE_URL,
    method: "GET",
    responseType: "blob"
  });
  fs.writeFileSync(NYSE_FILE, response.data);

  console.log("Files downloaded");
};

export default downloadFiles;
