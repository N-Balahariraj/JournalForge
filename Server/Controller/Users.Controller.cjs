const UserModel = require("../Model/Users.Model.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = (req, res) => {
  const { name, email, password } = req.body;
  newUser = new UserModel({
    name,
    email,
    password: bcrypt.hashSync(password, 5),
  });
  UserModel.findOne({ email })
    .then((result) => {
      if (result) {
        res.status(400).json({ message: "User Already Exist" });
        return;
      }
      newUser.save().then((result) => {
        res
          .status(200)
          .json({ message: "User Registered Successfully", details: result });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.Login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }).then((result) => {
    if (!result) {
      res.status(404).send({ message: "The user have not Registered" });
      return;
    }

    let isValidPassword = bcrypt.compareSync(password, result.password);

    if (isValidPassword) {
      let Token = jwt.sign({ id: result._id }, "Secret Key");
      res.status(200).send({
        User: {
          name: result.name,
          email: result.email,
          password: result.password,
        },
        Token: Token,
      });
      return;
    }

    res.status(401).send({ message: "Password is Incorrect" });
  });
};

exports.EditProfile = (req, res) => {};

exports.DeleteAcc = (req, res) => {};
