const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  const token = event.authorizationToken.split(' ')[1]; // Assuming 'Bearer <token>'
  const secret = process.env.AUTH0_SECRET;

  try {
    const decoded = jwt.verify(token, secret);
    return generatePolicy('user', 'Allow', event.methodArn, decoded);
  } catch (error) {
    return generatePolicy('user', 'Deny', event.methodArn);
  }
};

const generatePolicy = (principalId, effect, resource, decoded) => {
  const authResponse = { principalId };
  if (effect && resource) {
    const policyDocument = {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      }],
    };
    authResponse.policyDocument = policyDocument;
  }
  authResponse.context = { user: decoded };
  return authResponse;
};
