const userModal = require("../Model/Users.Model.cjs");

exports.isMyJournal = async (req, res, next) => {
  const journals = req.user.journals;
  const title = req.params.title

  try {

    const myJournal = journals.includes(title);

    if (!myJournal) {
      res.status(403).send({ message: "The jounals is not published by you" });
      return;
    }

    next();
  } 
  
  catch (error) {
    console.log("error : ", error);
    res.status(403).send({ message: "The jounal is not published by you !!!" });
  }
};
