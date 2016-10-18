const AWS = require('aws-sdk');
const axios = require('axios');

// const dynamoDb = new AWS.DynamoDB.DocumentClient();
const S3 = new AWS.S3({
  params: {
    Bucket: 'oh-hi-mark-indexes'
  }
});

module.exports = (event, cb) => {
  if (event.headers.Authorization == null) {
    return cb(401, { message: 'No authorization header found' });
  }
  const token = event.headers.Authorization.split(' ')[1];

  const data = JSON.parse(event.body);
  if (data.payload == null
  ) {
    return cb(400, { message: 'No payload sent' });
  }
  const payload = data.payload;

  return axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
    params: {
      access_token: token
    }
  })
  .then((result) => {
    const email = result.data.email;
    const updatedAt = new Date().getTime();
    return S3.putObject({
      Key: email,
      Body: JSON.stringify({
        updatedAt,
        payload,
      }),
    }, (error, res) => {
      if (error != null) {
        return cb(error.statusCode);
      }
      return cb(201, res);
    });
  })
  .catch((error) => {
    return cb(401, { message: 'Unable to authenticate request' });
  });
};
