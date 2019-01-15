'use strict';

const dynamo = require("./dynamodb.service");

module.exports.handler = async (event, context) => {

  try {
    const result = await dynamo.getItems(
        event.queryStringParameters.agent,
        event.queryStringParameters.subproducer,
        event.queryStringParameters.date);
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch(e) {
    console.log(e)
  }
};
