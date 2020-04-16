const ConnectToDatabase = require('../db');
const ObjectId = require('mongodb').ObjectId; 

const getSnippet = async (req, res) => {
  const db = await ConnectToDatabase(process.env.DB_URL);

  const objectId = new ObjectId(req);
  const collection = await db.collection('snippets');
  const snippet = await collection.find({ _id: objectId }).toArray();
  return snippet[0];
}

module.exports = getSnippet;
