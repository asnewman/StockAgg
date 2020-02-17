import { Client } from "@elastic/elasticsearch";

console.log(process.env.ELASTICSEARCH_NODE);
let client = new Client({ node: process.env.ELASTICSEARCH_NODE });

/**
 * Updates elasticsearch with new records
 */
const updateIndex = async (data: Array<unknown>) => {
  // First delete all entries
  await client.deleteByQuery({
    index: process.env.ELASTICSEARCH_INDEX,
    body: {
      query: {
        match_all: {}
      }
    }
  });

  // Now update
  const body = data.flatMap(stock => [
    { index: { _index: process.env.ELASTICSEARCH_INDEX } },
    stock
  ]);
  try {
    await client.bulk({ refresh: "true", body });
  } catch (e) {
    throw e;
  }
};

export default updateIndex;
