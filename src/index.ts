import { updateIndex } from "./services/elasticsearch/elasticsearch";
import { getStocks } from "./services/data/data";

// If this is to be invoked directly, we can create our own event
export interface Event {
  name: string;
}

const main = async (): Promise<string> => {
  try {
    const stockData = await getStocks();
    await updateIndex(stockData);
    return "Success";
  } catch (e) {
    return `Failed + ${e}`;
  }
};

if (process.env.NODE_ENV == "DEV") {
  main();
}

export default main;
