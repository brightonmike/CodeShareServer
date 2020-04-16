import { NowRequest, NowResponse } from '@now/node';

import { ApolloServer } from 'apollo-server-lambda';
const snippetsSchema = require('../schema/snippets');
const snippetResolver = require('../resolvers/snippets');

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

module.exports = apolloServer.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});


// export default (req: NowRequest, res: NowResponse) => {
//     try {
//         apolloServer.listen().then(({ url, server }) => {
//             console.log(`🚀  Server ready at ${url}`);
//             res.send(`🚀  Server ready at ${url}`);
//         }).catch(error => {
//             console.log(`🥵 Error: ${error}`);  
//             res.send(`🥵 Error: ${error}`);
//         });
//     } catch (err) {
//         console.log(`🥵 Error: ${err}`);  
//         res.send(`🥵 Error: ${err}`);
//     }
// }