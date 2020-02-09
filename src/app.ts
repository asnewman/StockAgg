import express from "express";

import downloadFiles from "./downloader/downloader";

const app = express();
const port = 3000;
app.get("/", async (req, res) => {
  await downloadFiles();

  res.send(`Downloaded`);
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening to port ${port}`);
});
