const AWS = require('aws-sdk');
const axios = require('axios');

// const dynamoDb = new AWS.DynamoDB.DocumentClient();
const S3 = new AWS.S3({
  params: {
    Bucket: 'oh-hi-mark-indexes'
  }
});
// TODO async https://ponyfoo.com/articles/understanding-javascript-async-await

module.exports = (event, cb) => {
  if (event.headers.Authorization == null) {
    return cb(401, { message: 'No authorization header found' });
  }
  const token = event.headers.Authorization.split(' ')[1];
  return axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
    params: {
      access_token: token,
    }
  })
    .then((result) => {
      const email = result.data.email;

      return S3.getObject({
        Key: email
      }, (error, data) => {
        console.log('data', data);
        console.log('VALUE', data == null);
        if (data == null) {
          console.log('been there srsly!!');
          return cb(404, { message: 'No entry found for this email' });
        }

        console.log('content', JSON.parse(data.Body.toString()));
        if (error != null) {
          return cb(error.statusCode);
        }
        return cb(200, JSON.parse(data.Body.toString()));
      });
    })
    .catch((error) => {
      console.log('error', error);
      return cb(401, { message: 'Unable to authenticate request' });
    });
};
