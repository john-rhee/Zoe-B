const bcrypt = require("bcryptjs");
const router = require("express").Router();
const Users = require("./user-model.js");
const restricted = require("../restricted-middleware.js");
const jwt = require("jsonwebtoken");

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
  });


router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = signToken(saved);
      res.status(201).json({
        user:saved,
        token
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//TOKEN LOGIN//
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // sign token
        const token = signToken(user); // new line

        // send the token
        res.status(200).json({
          user_id:user.id,
          token, // added token as part of the response sent
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error" });
    });
});

// this functions creates and signs the token
function signToken(user) {
  const payload = {
    username: user.username,
    password:user.password,
    id: user.id
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: "3h",
  };

  return jwt.sign(payload, secret, options); // notice the return
}

router.get("/",restricted, (req, res) => {
  Users.find()
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

// GET Users by ID
router.get('/:id', restricted, (req, res) => {

  const { id } = req.params;

  Users.findById(id)
  .then(user => {        
    res.status(200).json(user);        
  })
  .catch(error => {
    res.status(500).json({ error: 'There was an error retrieving the user from the database.'});
  })
})

module.exports = router;