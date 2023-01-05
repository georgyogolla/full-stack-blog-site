import {
  MongoClient
} from 'mongodb';

let db;

async function connectToDb(cb) {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect(); //establish connection

  db = client.db('ogolla-db'); //use ogolla-db
  cb();
}
export {
  db,
  connectToDb
};