const express = require("express")
const router = express.Router()
const { protect , checkSuperAdmin , checkSchoolAdmin ,loginAdmin , createAdmin  ,findStudentById} = require("./Auth")
const { findSchoolById  , findClassRoomById ,findAllStudents,findAllClassRooms , deleteStudentById} = require("./Auth")
const { deleteClassRoomById , createStudent , createClassRoom ,createSchool} = require("./Auth")
const { updateSchool , updateClassRoom , updateStudent } = require("./Auth")



router.route("/admin").post(createAdmin)
router.route("/login").post(loginAdmin)
router.route("/student/:id").get([protect,checkSchoolAdmin,findStudentById])
router.route("/school/:id").get([protect,checkSchoolAdmin,findSchoolById])
router.route("/classRoom/:id").get([protect,checkSchoolAdmin,findClassRoomById])
router.route("/student").get([protect,checkSchoolAdmin,findAllStudents])
router.route("/classRoom").get([protect,checkSchoolAdmin,findAllClassRooms])
router.route("/student/:id").delete([protect,checkSchoolAdmin,deleteStudentById])
router.route("/classRoom/:id").delete([protect,checkSchoolAdmin,deleteClassRoomById])
router.route("/student").post([protect,checkSchoolAdmin,createStudent])
router.route("/classRoom").post([protect,checkSchoolAdmin,createClassRoom])
router.route("/school").post([protect,checkSuperAdmin,createSchool])
router.route("/school").patch([protect,checkSuperAdmin,updateSchool])
router.route("/classRoom").patch([protect,checkSchoolAdmin,updateClassRoom])
router.route("/student").patch([protect,checkSchoolAdmin,updateStudent])

module.exports = router