const AWS = require('aws-sdk');

const deleteTodo = async (event) => {
  // https://dynobase.dev/dynamodb-nodejs/
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  // https://dynobase.dev/dynamodb-nodejs/#delete-item
  try {
    const result = await dynamodb
      .delete({
        TableName: 'TodoTable',
        Key: { id },
        ConditionExpression: 'attribute_exists(id)',
        ReturnValues: 'ALL_OLD',
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'item has been deleted' }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify(err),
    };
  }
};

module.exports = {
  handler: deleteTodo,
};
