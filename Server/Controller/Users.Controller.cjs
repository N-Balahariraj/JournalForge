const UserModel = require("../Model/Users.Model.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      throw new Error({
        status: 409,
        message: "User already exist",
      });
    }

    const newUser = await UserModel.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 19),
    });

    if (!newUser.ok) {
      throw new Error({
        status: 500,
        message: "Server error. User was not registered, try again later",
      });
    }

    res.status(201).send({ message: "New user created successfully" });
  } 
  
  catch (error) {
    console.log("error : ", error);
    res.status(error.status || 500).send({
      message: error.message,
    });
  }
};

const cookieOptions = {
  SameSite: none,
  Secure: true,
  Partition : true,
  Domain: "JournalForge.netlify.app",
  Path: "/",
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error({
        status: 403,
        message: "The specified user is not registered",
      });
    }

    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass) {
      throw new Error({
        status: 403,
        message: "The password is incorrect",
      });
    }

    const payload = {
      id: user._id,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "24h",
    });

    cookie.set("ACCESS_TOKEN", accessToken, cookieOptions);
    cookie.set("REFRESH_TOKEN", refreshToken, cookieOptions);
    res.status(200).send({ message: "User logged In Successfully" });
  } 
  
  catch (error) {
    console.log("error : ", error);
    res
      .status(error.status || 500)
      .send(error.message || { message: "User was unable to login" });
  }
};

exports.EditProfile = async (req, res) => {
  const id = req.user.id;
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: { name: name, email: email, password: password },
      },
      {new : true}
    );

    if (!user.ok)
      throw new Error({
        status: 500,
        message:
          "Server error. Profile not updated, try changing the credentials ",
      });

    res.status(200).send({ message: "The profile updated successfully" });
  } 
  
  catch (error) {
    console.log("error : ", error);
    res.status(error.status || 500).send(
      error.message || {
        message: "Server error. Profile not updated, try again later",
      }
    );
  }
};

exports.DeleteAcc = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await UserModel.findByIdAndDelete({ id });
    if (!user)
      throw new Error({
        status: 403,
        message: "The specified user does not exist",
      });
    res
      .status(200)
      .send({ message: "Your account has been deleted successfully" });
  } 
  
  catch (error) {
    console.log("error : ", error);
    res.status(500).send({
      message: "Server error. Unable to delete the account, try again later",
    });
  }
};

exports.refreshToken = async (req, res) => {
  const freshToken = jwt.sign(req.user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  cookie.set("ACCESS_TOKEN", freshToken, cookieOptions);

  res.status(200).send({ message: "The token refreshed successfully" });
};
