'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-11-05', region: 'eu-west-1'});
const dbName = 'cigDb';

module.exports.insertItem = async (item) => {
    const params = {
        TableName: dbName,
        Item: item
    };

    return docClient.put(params, (err, data) => {
        if (err) console.log(err);
        else console.log(data);
    }).promise();
};

module.exports.getItem = async (uuid) => {
    const params = {
        TableName: dbName,
        Key: {
            uuid: uuid
        }
    };

    return docClient.get(params, (err, data) => {
        return data;
    }).promise();
};

module.exports.getItems = async (agent, subproducer, date) => {
    let subp = subproducer === undefined ? '' : subproducer;
    const params = {
        TableName: dbName,
        IndexName : 'index-date_agent_subproducer',
        KeyConditionExpression: "#date = :effective_date AND begins_with(#agent, :agent)",
        ExpressionAttributeNames: {
            "#date": "effective_date",
            "#agent": "agent_subproducer"
        },
        ExpressionAttributeValues: {
            ":effective_date": date,
            ":agent": `${agent}#${subp}`
        },
    };

    return docClient.query(params, (err, data) => {
        return data;
    }).promise();
};

// Expensive
module.exports.scan = async (limit, startKey) => {
    const params = {
        TableName: dbName,
        // Watch out - reserved keywords https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
        ProjectionExpression: 'effective_date, created_at',
        Limit: limit
    };

    if (startKey) {
        params.ExclusiveStartKey = {
            uuid: startKey
        };
    }

    return docClient.scan(params, (err, data) => {
        return data;
    }).promise();
};