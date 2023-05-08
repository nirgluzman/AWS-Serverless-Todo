const { v4 } = require('uuid');
const AWS = require('aws-sdk');

// middleware engine for AWS Lambda
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

const addTodo = async (event) => {
  // https://dynobase.dev/dynamodb-nodejs/
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { todo } = event.body;
  const createdAt = new Date().toString();
  const id = v4();

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  // https://dynobase.dev/dynamodb-nodejs/#put-item
  try {
    const result = await dynamodb
      .put({
        TableName: 'TodoTable',
        Item: newTodo,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'New item has been created' }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser()),
};
