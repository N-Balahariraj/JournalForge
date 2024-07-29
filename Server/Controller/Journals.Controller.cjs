const JournalModel = require("../Model/Journals.Model.cjs");
const userModal = require("../Model/Users.Model.cjs");

// Create
exports.create = async (req, res) => {
  const {
    title,
    pic = "https://www.agastiyarzones.com/assets/img/service/Journal_Publication.png",
    desc,
  } = req.body;

  try {
    const newJournal = await JournalModel.create({
      title,
      pic,
      desc,
    });

    if (!newJournal)
      throw new Error({
        status: 500,
        message: "Server error. Try again later",
      });

    const addJournal = await userModal.updateOne(
      { _id: req.user.id },
      {
        $push: { journals: title },
      }
    );

    if (!addJournal)
      throw new Error({
        status: 500,
        message: "Server error. Journal not published, try again later",
      });

    res.status(201).send({ message: "New journal published successfully " });
  } 
  
  catch (error) {
    console.log("error : ", error);
    res
      .status(error.status || 500)
      .send(
        error.message || {
          message: "Server error. Journal was not published, try again later",
        }
      );
  }
};


// Read
exports.read = async (req, res) => {
  const userId = req.user.id

  try {
    const user = await userModal.findById({_id : userId})
    const journals = await JournalModel.find()

    if(!user || !journals)
      throw new Error({
        status : 404,
        message : "User or journals not found"
      })

    res
      .status(200)
      .send({
        message : "Journals retrieved successfully",
        journals : journals,
        myJournals : user.journals
      })
  } 
  
  catch (error) {
    console.log("error : ", error)
    res.status(error.status || 500).send(error.message || {message : "Server error. Unable to fetch the journals, try again later"})
  }
};


// Update
exports.editJournal = async (req, res) => {
  const oriTitle = req.params.title;
  const { title, pic, desc } = req.body;

  try {
    const editedJournal = await JournalModel.findOneAndUpdate(
      { oriTitle },
      {
        $set: { title, pic, desc },
      },
      { new: true }
    );

    if (!editedJournal)
      throw new Error({
        status: 403,
        message:
          "Either the journal is not yours or the journal does not exist",
      });

    res.status(200).send({ message: "The journal updated successfully" });
  } 
  
  catch (error) {
    console.log("error : ", error);
    res.status(error.status || 500).send(
      error.message || {
        message: "Server error. The journal was not updated, try again later",
      }
    );
  }
};


// Delete
exports.delJournal = async (req, res) => {
  const oriTitle = req.params.title;

  try {
    const journal = await JournalModel.findOneAndDelete({ title: oriTitle });

    if (!journal)
      throw new Error({
        status: 403,
        message:
          "Either the journal is not published by you or the journal does not exist",
      });

    res.status(200).send({ message: "The journal deleted successfully" });
  } 
  
  catch (error) {
    console.log("error : ", error);
    res.status(500).send(
      error.message || {
        message: "Server error. Document was not deleted, try again later",
      }
    );
  }
};
