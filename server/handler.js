const indexGet = require('./index-get.js');
const indexPost = require('./index-post.js');

module.exports.indexGet = (event, context) => {
  console.log('been there');
  indexGet(event, (statusCode, body) => {
    const response = {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(body),
    };

    context.succeed(response);
  });
};

module.exports.indexPost = (event, context) => {
  indexPost(event, (statusCode, body) => {
    const response = {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(body),
    };

    context.succeed(response);
  });
};
