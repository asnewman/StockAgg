import express from "express";

import downloadFiles from "./downloader/downloader";
import extractCsvs from "./extractor/extractor";

const app = express();
const port = 3000;
app.get("/", async (req, res) => {
  res.send("Welcome to the StockAgg API (stocka.gg)");
});
app.get("/all", async (req, res) => {
  const files = await downloadFiles();
  const data = await extractCsvs(files);
  res.send(data);
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening to port ${port}`);
});
