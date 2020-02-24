import { Client } from "@elastic/elasticsearch";

let client = new Client({
  node: process.env.ELASTICSEARCH_NODE
    ? process.env.ELASTICSEARCH_NODE
    : "http://localhost:9200"
});

/**
 * Updates elasticsearch with new records
 */
const updateIndex = async (data: Array<unknown>) => {
  // First delete all entries
  await client.deleteByQuery({
    index: "stock-agg",
    body: {
      query: {
        match_all: {}
      }
    }
  });

  // Now update
  const body = data.flatMap(stock => [
    { index: { _index: "stock-agg" } },
    stock
  ]);

  try {
    await client.bulk({ refresh: "true", body });
    console.log("*** Data uploaded ***");
  } catch (e) {
    throw Error(`Failed to update ElasticSearch index: ${e}`);
  }
};

export { updateIndex };
