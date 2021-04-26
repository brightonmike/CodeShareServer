const ConnectToDatabase = require('../db');
const ObjectId = require('mongodb').ObjectID;

const deleteSnippet = async (req, res) => {
  const db = await ConnectToDatabase(process.env.DB_URL);

  console.log(req);

  const { snippetId } = req;

  try {
    const res = await db.collection('snippets').deleteOne( {"_id": ObjectId(snippetId)});;

    const { acknowledged } = res;

    console.log(`res => ${JSON.stringify(res)}`);

    return {
      success: true,
      message: "Snippet was Permanently deleted!",
    }

  } finally {
    // db.close();
  }
}

module.exports = deleteSnippet;
