const UserController = require("../Controller/Users.Controller.cjs")
const verifyToken = require('../Middlewares/VerifyToken.cjs')

module.exports = (app) => {
    app.post('/api/Register',UserController.Register)
    app.post('/api/Login',UserController.Login)
    app.put('/api/EditProfile',verifyToken.verifyAccessToken,UserController.EditProfile)
    app.delete('/api/DeleteAcc',verifyToken.verifyAccessToken,UserController.DeleteAcc)
    app.get('/api/Logout',UserController.Logout)
    app.get('/api/refreshToken',verifyToken.verifyRefreshToken,UserController.refreshToken)
}