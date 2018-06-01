const express = require('express');
const router = express.Router();

const userController = require('./controller')
const authMiddleware = require("../auth/auth");
router.get('/', authMiddleware.authorize, (req, res) => {
  userController
  .getAllUserPerPage(req.query.page || 1) 
  .then(users => res.send(users))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

router.get('/sort/username', authMiddleware.authorize, (req, res) => {
  userController
  .getAllUserSortUserName(req.query.page || 1) 
  .then(users => res.send(users))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

router.get('/sort/fullname', authMiddleware.authorize, (req, res) => {
  userController
  .getAllUserSortFullName(req.query.page || 1) 
  .then(users => res.send(users))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

router.get('/sort/email', authMiddleware.authorize, (req, res) => {
  userController
  .getAllUserSortEmail(req.query.page || 1) 
  .then(users => res.send(users))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

router.get('/all', authMiddleware.authorize, (req, res) => {
  userController
  .getAllUser(req.query.page || 1) 
  .then(users => res.send(users))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

router.get('/:id', authMiddleware.authorize, (req, res) => {
  userController
  .getUser(req.params.id)
  .then(user => res.send(user))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

// router.use("/:id/*", authMiddleware.authorize, (req, res, next) => {
//   if (req.session.userInfo.id != req.params.id) {
//     res.status(401).send("Unauthorized!");
//   } else next();
// });

router.post("/", (req, res) => {
  userController
    .createUser(req.body)
    .then(id => res.send(id))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.delete("/:id", (req, res) => {
  if (req.session.id !== req.params.id) {
    return res.status(401).send("Unauthorized!");
  }

  userController
    .deleteUser(req.params.id)
    .then(id => res.send(id))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;