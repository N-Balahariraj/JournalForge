const JournalModel = require("../Model/Journals.Model.cjs");

exports.create = (req, res) => {
  const {
    title,
    pic = "/International Journal of Educational Research.png",
    desc,
  } = req.body;
  const newJournal = new JournalModel({ title, pic, desc });
  newJournal
    .save()
    .then((result) => {
      if (!result) res.status(400).json({ message: "Something went wrong" });
      res.status(200).send(result);
    })
    .catch((err) =>
      res.status(500).send({ message: "Server not available", error: err })
    );
};

exports.read = (req, res) => {
  JournalModel.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        status: "failure",
        message: "could not fetch details",
        error: err,
      });
    });
};
