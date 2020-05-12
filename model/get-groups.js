const ConnectToDatabase = require('../db');

const getGroups = async (req, res) => {
  const db = await ConnectToDatabase(process.env.DB_URL);

  const collection = await db.collection('groups');
  const groups = await collection.find({}).toArray();
  return groups;
}

module.exports = getGroups;
