const Mongoose = require("mongoose")
const studentschema = new Mongoose.Schema({
  name: {
    type: String,
  },
  school: {
    type: String,
    required: true,
  },
  classRoom: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
})

const student = Mongoose.model("student", studentschema)
module.exports = student