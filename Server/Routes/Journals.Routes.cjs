const JournalController = require('../Controller/Journals.Controller.cjs')
const verifyToken = require('../Middlewares/VerifyToken.cjs')

module.exports = (app) => {
    app.post('/Publish',verifyToken,JournalController.create)
    app.get('/Journals',JournalController.read)
}