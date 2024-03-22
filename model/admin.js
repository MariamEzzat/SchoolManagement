const Mongoose = require("mongoose")
const adminschema = new Mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  role:{
  type: String,
  default: "schoolAdmin"
}
})

const admin = Mongoose.model("admin", adminschema)
module.exports = admin