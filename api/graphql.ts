import { NowRequest, NowResponse } from '@now/node';

import { ApolloServer } from 'apollo-server-micro';
const snippetsSchema = require('../schema/snippets');
const snippetResolver = require('../resolvers/snippets');
const cors = require('micro-cors')();

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const dotenv = require('dotenv');
dotenv.config();

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

function getKey(header, cb){
  client.getSigningKey(header.kid, function(err, key) {
      var signingKey = key.publicKey || key.rsaPublicKey;
      cb(null, signingKey);
  });
}

const options = {
  audience: process.env.AUTH0_CLIENTID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
};

const apolloServer = new ApolloServer({
  typeDefs: snippetsSchema,
  resolvers: snippetResolver,
  context: ({ req }) => {
    // simple auth check on every request
    const token = req.headers.authorization;
    const user = new Promise((resolve, reject) => {
      jwt.verify(token, getKey, options, (err, decoded) => {
        if(err) {
          return reject(err);
        }
        resolve(decoded.email);
      });
    });

    return {
      user
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = apolloServer.createHandler({ path: "/api/graphql" }); 
 
export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  } else {
    return handler(req, res);
  }
});
