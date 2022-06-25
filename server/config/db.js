const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://anshumannehru:anshuman@cluster0.k5afh.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  await client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });
    console.log('MongoDb Connected');
};

module.exports = connectDB;
