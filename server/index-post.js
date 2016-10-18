const AWS = require('aws-sdk');
const axios = require('axios');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, cb) => {
  console.log('body', event.body);
  const data = JSON.parse(event.body);
  if (data.payload == null
  ) {
    cb(400, { message: 'No payload sent' });
  }

  const token = event.headers.Bearer;
  const payload = data.payload;

  return axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
    params: {
      access_token: token
    }
  })
  .then((result) => {
    const email = result.data.email;
    const updatedAt = new Date().getTime();
    return dynamoDb.put({
      TableName: 'indexes',
      Item: {
        id: email,
        payload,
        updatedAt,
      }
    }, (error) => {
      if (error) {
        cb(500, { message: error });
      }
      cb(201, null);
    });
  });
};
