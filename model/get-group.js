const ConnectToDatabase = require('../db');
const ObjectId = require('mongodb').ObjectId; 

const getGroup = async (req, res) => {
  const db = await ConnectToDatabase(process.env.DB_URL);

  const objectId = new ObjectId(req);
  const collection = await db.collection('groups');
  const group = await collection.find({ _id: objectId }).toArray();
  return group[0];
}

module.exports = getGroup;
