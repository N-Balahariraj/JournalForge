const JournalController = require('../Controller/Journals.Controller.cjs')
const verifyToken = require('../Middlewares/VerifyToken.cjs')
const isMyJournal = require('../Middlewares/isMyJournal')

module.exports = (app) => {
    app.get('/Journals',JournalController.read)
    app.post('/Journals/Publish',verifyToken.verifyAccessToken,JournalController.create)
    app.put('/Journals/Edit/:title',verifyToken.verifyAccessToken, isMyJournal, JournalController.editJournal)
    app.delete('/Journals/Delete/:title',verifyToken.verifyAccessToken, isMyJournal, JournalController.delJournal)
}