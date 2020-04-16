const ConnectToDatabase = require('../db');

const addSnippet = async (req, res) => {
  const db = await ConnectToDatabase(process.env.DB_URL);

  const {
    title,
    author,
    userPicture,
    languages,
    code,
    comments,
    versions,
    types
  } = req;

  try {
    const res = await db.collection('snippets').insertOne(
      {
        title,
        author,
        userPicture,
        languages,
        code,
        comments,
        versions,
        types
      }
    );

    const { insertedId } = res;

    console.log(`res => ${JSON.stringify(res)}`);

    return {
      success: true,
      message: "Added!",
      title,
      author,
      userPicture,
      languages,
      code,
      comments,
      versions,
      types,
      _id: insertedId
    }

  } finally {
    // db.close();
  }
}

module.exports = addSnippet;
