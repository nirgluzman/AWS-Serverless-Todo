const AWS = require('aws-sdk');

const fetchTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  // https://dynobase.dev/dynamodb-nodejs/#get-item
  try {
    const result = await dynamodb
      .get({
        TableName: 'TodoTable',
        Key: { id },
      })
      .promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'ID not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
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
  handler: fetchTodo,
};
