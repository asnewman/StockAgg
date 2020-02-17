import express from "express";
import { config } from "dotenv";
config();

import updateIndex from "./services/elasticsearch/elasticsearch";
import { getStocks } from "./services/data/data";

const app = express();
const port = 3000;

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening to port ${port}`);
});

/* Routes */
app.get("/", async (req, res) => {
  res.send("Welcome to the StockAgg API (stocka.gg)");
});

app.get("/all", async (req, res) => {
  const data = await getStocks();
  res.send(data);
});

app.get("/pull", async (req, res) => {
  try {
    await updateIndex(await getStocks());
    res.send(`Updared new stock information successfully`);
  } catch (e) {
    res.send(e);
  }
});
