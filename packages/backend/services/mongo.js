import mongoose from "mongoose";
import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

function getMongoURL(dbname) {
  const MONGO_USER = process.env.MONGO_USER;
  const MONGO_PASS = process.env.MONGO_PASS;
  let connection_string = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.yomgmem.mongodb.net/${dbname}?retryWrites=true&w=majority`;
  if (MONGO_USER && MONGO_PASS) {
    console.log(
      "Connecting to MongoDB at",
      `mongodb+srv://${MONGO_USER}:<password>@cluster0.yomgmem.mongodb.net/${dbname}`
    );
    connection_string = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.yomgmem.mongodb.net/${dbname}?retryWrites=true&w=majority`;
  } else {
    console.log("Connecting to MongoDB at ", connection_string);
  }
  return connection_string;
}

export function connect(dbname) {
  mongoose
    .connect(getMongoURL(dbname))
    .catch((error) => console.log(error));
}