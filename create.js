'use strict';

const dynamo = require("./dynamodb.service");
const uuid = require('uuid/v4');

module.exports.handler = async (event, context) => {
  const agent_id = Math.floor((Math.random() * 1000) + 1);
  const subproducer_id  = Math.floor((Math.random() * 1000) + 1);

  const item = {
    uuid: uuid(),
    agent: agent_id,
    subproducer: subproducer_id,
    agent_subproducer: `${agent_id}#${subproducer_id}`,
    effective_date: new Date().toISOString().slice(0,10),
    created_at: new Date().toISOString(),
    edited_at: new Date().toISOString(),
  };

  try {
      return await dynamo.insertItem(item);
  } catch(e) {
    console.log(e)
  }
};
