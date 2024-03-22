const Mongoose = require("mongoose")
const classRoomSchema = new Mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
})

const classRoom = Mongoose.model("classRoom", classRoomSchema)
module.exports = classRoom