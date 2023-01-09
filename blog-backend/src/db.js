import {
  MongoClient
} from 'mongodb';

let db;

async function connectToDb(cb) {
  const client = new MongoClient(`mongodb + srv: //${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.sifwz5s.mongodb.net/?retryWrites=true&w=majority`);
  await client.connect(); 
  
  //establish connection

  db = client.db('ogolla-db'); //use ogolla-db
  cb();
}
export {
  db,
  connectToDb
};