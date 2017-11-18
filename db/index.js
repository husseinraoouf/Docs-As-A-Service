const {
  MongoClient
} = require('mongodb');

const buildDataloaders = require('./dataloaders');

const buildKeyword = require('./keywords');

// 1
const { MONGO_URL } = require('../lib/consts');

// 2
module.exports = async() => {
  const db = await MongoClient.connect(MONGO_URL);
  const col = {
    Keywords: db.collection('Keywords'),
  };

  const dataloaders = buildDataloaders(col);

  const keywordDB = buildKeyword(col, dataloaders);


  return {
    keywordDB,
  }

}
