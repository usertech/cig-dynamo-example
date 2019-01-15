'use strict';

const dynamo = require("./dynamodb.service");


module.exports.handler = async (event, context) => {
  try {
    const result = await dynamo.getItem(event.pathParameters.uuid);
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch(e) {
    console.log(e)
  }
};
