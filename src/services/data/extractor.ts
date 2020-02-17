import fs from "fs";
import neatCsv from "neat-csv";

const extractCsvs = async (files: Array<string>) => {
  let data = [];

  for (let file of files) {
    console.log("Extracting file: ", file);
    const fileData = await fs.promises.readFile(file);
    data = data.concat(await neatCsv(fileData));
  }

  return data;
};

export default extractCsvs;
