const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTodo = async (event) => {
  // https://dynobase.dev/dynamodb-nodejs/
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { todo } = JSON.parse(event.body);
  const createdAt = new Date().toString();
  const id = v4();

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };

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
  handler: addTodo,
};
