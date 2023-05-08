const AWS = require('aws-sdk');

const updateTodo = async (event) => {
  // https://dynobase.dev/dynamodb-nodejs/
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const { completed } = JSON.parse(event.body);

  // https://dynobase.dev/dynamodb-nodejs/#update-item
  // https://stackoverflow.com/questions/41873769/how-to-prevent-creating-a-new-item-in-updateitem-if-the-item-does-not-exist
  try {
    const result = await dynamodb
      .update({
        TableName: 'TodoTable',
        Key: { id },
        ConditionExpression: 'attribute_exists(id)',
        UpdateExpression: 'set completed = :completed',
        ExpressionAttributeValues: {
          ':completed': completed,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
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
  handler: updateTodo,
};
