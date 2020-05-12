const ConnectToDatabase = require('../db');

const addGroup = async (req, res) => {
  const db = await ConnectToDatabase(process.env.DB_URL);

  const {
    groupTitle,
    snippets
  } = req;

  try {
    const res = await db.collection('groups').insertOne(
      {
        groupTitle,
        snippets
      }
    );

    const { insertedId } = res;

    console.log(`res => ${JSON.stringify(res)}`);

    return {
      success: true,
      message: "Added!",
      groupTitle,
      snippets,
      _id: insertedId
    }

  } finally {
    // db.close();
  }
}

module.exports = addGroup;
