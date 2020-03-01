# StockAgg

This is a AWS Lambda function that grabs NASDAQ, NYSE and AMEX stock data from nasdaq.com and inserts it into an ElasticSearch instance.

## Running Locally

1. Run ElasticSearch (tested on 7.5) and Kibana (for verifying data) running locally on their default ports.
1. Clone the repo and run `yarn`.
1. Run `yarn start` and once complete, the index `stock-agg` on your ElasticSearch instance should have the stock data.

## Uploading the Lambda

1. Make sure you have sam credientials properly set up.
1. Run `yarn build`.
1. Run `yarn package`.
1. Run `yarn deploy`.
1. Create an env variable for your lambda function `ELASTICSEARCH_NODE=<prod-elastic-instance>`.
