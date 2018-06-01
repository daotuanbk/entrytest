const userController = require('../users/controller')
const bcrypt = require('bcryptjs');

const login = ({ username, password }) =>
  new Promise((resolve, reject) => {
    //success
    //incorrect username
    //incorrect password
    //internal sever error
    userController.getUserforAuth(username)
      .then(user => {
        if (!user || !user.password) { //kiem tra xem user co ton tai k
          reject({
            status: 400, //Bad request
            err: "Incorrect username"
          })
        }
        else {
          bcrypt.compare(password, user.password)
          .then(result => {
            if (result) {
              resolve({username: user.username, id: user._id})
            }
            else {
              reject({
                status: 400,
                err: "Incorrect password"
              })
            }
          })
        }
      })
      .catch(err =>
        reject({
          status: 501,
          err: err
        }))
  })

  module.exports = {
    login
  }