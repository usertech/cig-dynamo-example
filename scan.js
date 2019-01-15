'use strict';

const dynamo = require("./dynamodb.service");

module.exports.handler = async (event, context) => {

  try {
    const result = await dynamo.scan(
        event.queryStringParameters.limit,
        event.queryStringParameters.offset
    );
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch(e) {
    console.log(e)
  }
};
