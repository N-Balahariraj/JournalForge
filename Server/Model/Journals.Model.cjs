const mongoose = require('mongoose')

const JournalSchema = new mongoose.Schema({
    title : String,
    pic : String,
    desc : String
})

const JournalModel = mongoose.model("Journals",JournalSchema)

module.exports = JournalModel