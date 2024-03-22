const Mongoose = require("mongoose")
const SchoolSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
})

const school = Mongoose.model("school", SchoolSchema)
module.exports = school