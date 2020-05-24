import { Client } from "@elastic/elasticsearch";


let client = new Client({
  node: process.env.ELASTICSEARCH_NODE
    ? process.env.ELASTICSEARCH_NODE
    : "http://127.0.0.1:9200"
});

/**
 * Updates elasticsearch with new records
 */
const updateIndex = async (data: Array<unknown>) => {
  try {

    // First delete all entries if stock-agg index exists

    const {body} = await client.indices.exists({index: "stock-agg"})

    if (body) {
      await client.deleteByQuery({
        index: "stock-agg",
        body: {
          query: {
            match_all: {}
          }
        }
      });
      console.log("*** Index cleared ***");
    }
  } catch (e) {
    throw Error(`Failed to clear ElasticSearch index: ${e}`);
  }
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
