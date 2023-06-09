const AWS = require('aws-sdk');

const fetchTodos = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  // https://dynobase.dev/dynamodb-nodejs/#scan
  try {
    const result = await dynamodb
      .scan({
        TableName: 'TodoTable',
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
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
  handler: fetchTodos,
};
