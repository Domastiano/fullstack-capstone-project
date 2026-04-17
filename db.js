const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('giftlink');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

module.exports = { connectToDatabase, client };
