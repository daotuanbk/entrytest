const userModel = require('./model');

const createUser = ({username, fullname, password, email}) => new Promise ((resolve, reject) => {
  userModel.create({
    username,
    fullname,
    password,
    email
  })
  .then(data => resolve({ id: data._id}))
  .catch(err => reject(err))
})

const getAllUser = page => new Promise((resolve, reject) => {
  userModel.find({
    'active': true
  })
    .sort({ createAt: -1 })
    .select("username fullname email")
    .exec()
    .then(data => resolve(data))
    .catch(err => reject(err))
})

const getAllUserPerPage = page => new Promise((resolve, reject) => {
  userModel.find({
    'active': true
  })
    .sort({ createAt: -1 })
    .skip((page - 1) * 5)
    .limit(5)
    .select("username fullname email")
    .exec()
    .then(data => resolve(data))
    .catch(err => reject(err))
})

const getAllUserSortUserName = page => new Promise((resolve, reject) => {
  userModel.find({
    'active': true
  })
    .sort({username: 1 })
    .skip((page - 1) * 5)
    .limit(5)
    .select("username fullname email")
    .exec()
    .then(data => resolve(data))
    .catch(err => reject(err))
})

const getAllUserSortFullName = page => new Promise((resolve, reject) => {
  userModel.find({
    'active': true
  })
    .sort({fullname: 1})
    .skip((page - 1) * 5)
    .limit(5)
    .select("username fullname email")
    .exec()
    .then(data => resolve(data))
    .catch(err => reject(err))
})

const getAllUserSortEmail = page => new Promise((resolve, reject) => {
  userModel.find({
    'active': true
  })
    .sort({email: 1 })
    .skip((page - 1) * 5)
    .limit(5)
    .select("username fullname email")
    .exec()
    .then(data => resolve(data))
    .catch(err => reject(err))
})

const getUserforAuth = username =>
  new Promise((resolve, reject) => {
    userModel.findOne({ username })
      .select('username password _id')
      .then(user => resolve(user))
      .catch(err => reject(err))
  })


const getUser = id => new Promise((resolve, reject) => {
  userModel.findOne({
    active: true,
    _id: id
  })
    .select("username fullname email")
    .exec()
    .then(data => resolve(data))
    .catch(err => reject(err))
})

module.exports = {
  createUser,
  getUserforAuth,
  getAllUser,
  getUser,
  getAllUserPerPage,
  getAllUserSortUserName,
  getAllUserSortFullName,
  getAllUserSortEmail
}