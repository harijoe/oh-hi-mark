const AWS = require('aws-sdk');
const axios = require('axios');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// TODO async https://ponyfoo.com/articles/understanding-javascript-async-await

module.exports = (event, cb) => {
  const token = event.headers.Bearer;
  return axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
    params: {
      access_token: token,
    }
  })
    .then((result) => {
      const email = result.data.email;

      return dynamoDb.get({
        TableName: 'indexes',
        Key: {
          id: email
        }
      }, (error, data) => {
        if (error != null) {
          cb(500, { message: error });
        }
        if (data.Item == null) {
          cb(404, { message: 'No index found' });
        }
        cb(200, data.Item);
      });
    })
    .catch((error) => {
      cb(null, { message: error.message });
    });
};
