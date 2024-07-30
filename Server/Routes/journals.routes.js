const JournalController = require('../Controller/Journals.Controller.cjs')
const verifyToken = require('../Middlewares/VerifyToken.cjs')
const isMyJournal = require('../Middlewares/isMyJournal')

module.exports = (app) => {
    app.get('/Journals',verifyToken.verifyAccessToken, JournalController.read)
    app.post('/Journals/Publish',verifyToken.verifyAccessToken, JournalController.create)
    app.put('/Journals/Edit/:title',verifyToken.verifyAccessToken, isMyJournal.isMyJournal, JournalController.editJournal)
    app.delete('/Journals/Remove/:title',verifyToken.verifyAccessToken, isMyJournal.isMyJournal, JournalController.delJournal)
}