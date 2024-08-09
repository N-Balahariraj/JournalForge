const UserModel = require("../Model/Users.Model.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(409).send({message : "The user already exist, try logging in"})
      return;
    }

    const newUser = await UserModel.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 19),
    });

    if (!newUser) {
      res.status(500).send({message : "Server error. Try again later"})
      return;
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
  httpOnly: true,
  Secure: true,
  SameSite: 'None',
  Domain: "JournalForge.netlify.app",
  Path: "/",
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(403).send({ message: "The specified user is not registered"})
      return;
    }

    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass) {
      res.status(403).send({message : "The password is incorrect"})
      return;
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

    res.cookie("ACCESS_TOKEN", accessToken, cookieOptions);
    res.cookie("REFRESH_TOKEN", refreshToken, cookieOptions);
    res.status(200).send({ 
      message: "User logged In Successfully", 
      user:{
        name : user.name,
        email : user.email,
        organization : user.organization,
        address : user.address,
        phone : user.phone,
        journals : user.journals
      }
    });
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
  const { name, email, organization, address, phone } = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: { name, email, organization, address, phone },
      },
      {new : true}
    );

    if (!user){
      res.status(500).send({ message: "Server error. Profile not updated, try changing the credentials "})
      return
    }

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
    const user = await UserModel.findByIdAndDelete(id);
    if (!user){
      res.status(404).send({message : "The specified user does not exist"})
      return
    }
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

exports.Logout = async (req, res) => {
  res.clearCookie("ACCESS_TOKEN", cookieOptions);
  res.clearCookie("REFRESH_TOKEN", cookieOptions);
  res.status(200).send({ message: "User logged out successfully" });
}

exports.refreshToken = async (req, res) => {
  const payload = {
    id : req.user.id,
    name : req.user.name
  }

  try{
    const freshToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  
    res.cookie("ACCESS_TOKEN", freshToken, cookieOptions);
  
    res.status(200).send({ message: "The token refreshed successfully" });
  }

  catch(error){
    console.log("error : ", error);
    res.status(500).send({
      message: "Server error. Unable to refresh the token, try again later",
      error : error.message
    });
  }
};
