const User = require("../model/user")
const school = require("../model/school")
const student = require("../model/student")
const classRoom = require("../model/classRoom")
const validator = require('email-validator');
const admin = require("../model/admin");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



exports.createAdmin = async (req, res, next) => {
  var { name,email,password, phone  , role} = req.body
  const isValid = validator.validate(email);   
  const hashedPassword = await bcrypt.hash(password, 12);

  if (isNaN(phone)) {
    return res.status(400).json({ message: "Phone Number must be numbers only" })
  }
  if (!isValid) {
    return res.status(400).json({ message: 'Email is not valid' });
  }
  if (!email) {
    return res.status(400).json({ message: 'email is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'password is required' });
  }

  try {
    await admin.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    }).then(admin =>

      res.status(200).json({
        message: "admin successfully created",
        admin,
      })
    )
  } catch (err) {
    res.status(401).json({
      message: err,
    })
  }}



  exports.checkSuperAdmin = async (req, res, next) => {
    if (req.admin && req.admin.role === 'superAdmin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  }



  exports.checkSchoolAdmin = async (req, res, next) => {
    if (req.admin && req.admin.role === 'schoolAdmin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  }


  exports.protect = async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } 
    if (!token) {
      return res.status(401).json({ message: "You are not logged in! Please log in to get access" });
    }
  
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  
  
    const currentUser = await admin.findById(decoded.user_id);
    if (!currentUser) {
      return res.status(401).json({ message: "The user belonging to this email does not exist" });
    }
    req.admin = currentUser;
    next();
  };



  /**
 * @swagger
 * /login:
 *   get:
 *     description: login
 *     responses:
 *       200:
 *         description: Admin login
 *         content:
 *           application/json:
 */
  exports.loginAdmin = async (req, res) => {

    const { email, password } = req.body;
    // Query the database to find a user with the provided email
    const adminDB = await admin.findOne({ email })
  
    // Return a 404 status with an error message if the user is not found
    if(!adminDB){
      return res.status(404).json({ message: "Admin doesn't exist" });
    }
  
    // Verify the provided password against the hashed password in the database
     const isPasswordCorrect = await bcrypt.compare(password, adminDB.password);

    // If the password is incorrect, return a 400 status with an error message
     if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid credentials" });
  
    // If the user is authenticated, generate a JWT token
      const token = jwt.sign({ user_id: adminDB._id }, process.env.JWT_SECRET, {
          expiresIn: "5h",
      });

      res.status(200).json({
        status: 'success',
        token,
        adminDB
      })
  }




  exports.login = (req, res) => {
    try {
      let refreshId = req.body.userId + jwtSecret;
      let salt = crypto.randomBytes(16).toString('base64');
      let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
      req.body.refreshKey = salt;
      let token = jwt.sign(req.body, jwtSecret);
      let b = Buffer.from(hash);
      let refresh_token = b.toString('base64');
      res.status(201).send({accessToken: token, refreshToken: refresh_token});
  } catch (err) {
      res.status(500).send({errors: err});
  }};








exports.findStudentById = async (req, res) => {
  try {
      const schoolStudent = await student.findById(req.params.id);
      res.status(200).json(schoolStudent);
  } catch(error) {
      res.status(404).json({ message: error.message});
  }
};

exports.findSchoolById = async (req, res) => {
  try {
      const school = await school.findById(req.params.id);
      res.status(200).json(school);
  } catch(error) {
      res.status(404).json({ message: error.message});
  }
};
exports.findClassRoomById = async (req, res) => {
  try {
      const classRoom = await classRoom.findById(req.params.id);
      res.status(200).json(classRoom);
  } catch(error) {
      res.status(404).json({ message: error.message});
  }
};



exports.findAllStudents = async (req, res) => {
  try {
      const studentList = await student.find();
      res.status(200).json(studentlist);
  } catch(error) {
      res.status(404).json({message: error.message});
  }
};

exports.findAllClassRooms = async (req, res) => {
  try {
      const classRoomList = await classRoom.find();
      res.status(200).json(classRoomList);
  } catch(error) {
      res.status(404).json({message: error.message});
  }
};


exports.deleteStudentById=async (req, res) => {
  await student.findByIdAndRemove(req.params.id).then(data => {
    if (!data) {
      res.status(404).send({
        message: `Student not found.`
      });
    } else {
      res.send({
        message: "student deleted successfully!"
      });
    }
}).catch(err => {
    res.status(500).send({
      message: err.message
    });
});
}

exports.deleteClassRoomById=async (req, res) => {
  await classRoom.findByIdAndRemove(req.params.id).then(data => {
    if (!data) {
      res.status(404).send({
        message: `class room not found.`
      });
    } else {
      res.send({
        message: "class room deleted successfully!"
      });
    }
}).catch(err => {
    res.status(500).send({
      message: err.message
    });
});
}


exports.createStudent = async (req, res, next) => {
  const { name, school,classRoom,email,phone } = req.body
  const isValid = validator.validate(email);
  if (isNaN(phone)) {
    return res.status(400).json({ message: "Phone Number must be numbers only" })
  }
  if (!isValid) {
    return res.status(400).json({ message: 'Email is not valid' });
  }
  if (!school) {
    return res.status(400).json({ message: 'school name is required' });
  }
  if (!classRoom) {
    return res.status(400).json({ message: 'Class Room name is required' });
  }
  try {
    await student.create({
      name,
      school,
      classRoom,
      email,
      phone
    }).then(student =>
      res.status(200).json({
        message: "student successfully created",
        student,
      })
    )
  } catch (err) {
    res.status(401).json({
      message: "student not successful created",
    })
  }
}

exports.createClassRoom = async (req, res, next) => {
  const { number, school } = req.body
  if (!school) {
    return res.status(400).json({ message: 'school name is required' });
  }
  if (!number) {
    return res.status(400).json({ message: 'class room number is required' });
  }
  try {
    await classRoom.create({
      username,
      password,
    }).then(classRoom =>
      res.status(200).json({
        message: "class room successfully created",
        classRoom,
      })
    )
  } catch (err) {
    res.status(401).json({
      message: "class room not successful created",
     // error: error.mesage,
    })
  }
}

exports.createSchool = async (req, res, next) => {
  const { name,email,phone } = req.body
  const isValid = validator.validate(email);
  if (isNaN(phone)) {
    return res.status(400).json({ message: "Phone Number must be numbers only" })
  }
  if (!isValid) {
    return res.status(400).json({ message: 'Email is not valid' });
  }
  if (!phone) {
    return res.status(400).json({ message: 'phone number is required' });
  }
  if (!email) {
    return res.status(400).json({ message: 'email address is required' });
  }
  if (!name) {
    return res.status(400).json({ message: 'scholl name is required' });
  }
  try {
    await school.create({
      name,email,phone
    }).then(school =>
      res.status(200).json({
        message: "school successfully created",
        school,
      })
    )
  } catch (err) {
    res.status(401).json({
      message: "school not successful created",
    })
  }
}


exports.updateSchool = async (req, res) => {
  if(!req.body) {
      res.status(400).send({
          message: "School Data to update can not be empty!"
      });
  }
  
  const id = req.params.id;
  
  await school.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
      if (!data) {
          res.status(404).send({
              message: `school not found.`
          });
      }else{
          res.send({ message: "school updated successfully." })
      }
  }).catch(err => {
      res.status(500).send({
          message: err.message
      });
  });
};


exports.updateClassRoom = async (req, res) => {
  if(!req.body) {
      res.status(400).send({
          message: "class room Data to update can not be empty!"
      });
  }
  
  const id = req.params.id;
  
  await classRoom.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
      if (!data) {
          res.status(404).send({
              message: `class room not found.`
          });
      }else{
          res.send({ message: "class room updated successfully." })
      }
  }).catch(err => {
      res.status(500).send({
          message: err.message
      });
  });
};

exports.updateStudent = async (req, res) => {
  if(!req.body) {
      res.status(400).send({
          message: "Data to update can not be empty!"
      });
  }
  
  const id = req.params.id;
  
  await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
      if (!data) {
          res.status(404).send({
              message: `User not found.`
          });
      }else{
          res.send({ message: "User updated successfully." })
      }
  }).catch(err => {
      res.status(500).send({
          message: err.message
      });
  });
};