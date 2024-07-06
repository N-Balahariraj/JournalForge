const UserController = require("../Controller/Users.Controller.cjs")

module.exports = (app) => {
    app.post('/api/Register',UserController.Register)
    app.post('/api/Login',UserController.Login)
    app.put('/api/EditProfile',UserController.EditProfile)
    app.delete('/api/DeleteAcc',UserController.DeleteAcc)
}