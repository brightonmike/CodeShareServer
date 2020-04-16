const ConnectToDatabase = require('../db');

const getSnippets = async (req, res) => {
  const db = await ConnectToDatabase(process.env.DB_URL);

  const collection = await db.collection('snippets');
  const snippets = await collection.find({}).toArray();

  return snippets;
}

module.exports = getSnippets;
