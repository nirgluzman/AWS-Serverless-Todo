const AWS = require('aws-sdk');

const fetchTodos = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  try {
    const result = await dynamodb
      .scan({
        TableName: 'TodoTable',
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
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
