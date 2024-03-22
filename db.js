const Mongoose = require("mongoose")

const localDB = `mongodb://localhost:27017/SchoolManagement`
const connectDB = async () => {
  await Mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")

  
}
module.exports = connectDB

