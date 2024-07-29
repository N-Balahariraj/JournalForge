const userModal = require("../Model/Users.Model.cjs");

exports.isMyJournal = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = userModal.findById(userId);

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const myJournal = user.journals.includes(req.params.title);

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
