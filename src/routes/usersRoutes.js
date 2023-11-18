const express = require('express');
const userController = require('../controllers/userController')


const router = express.Router();

//add user route
router.post("/",userController.createUser);

//get all users
router.get("/",userController.getUsers);

//get a user route
router.get('/:id',userController.getUser);

//update a user route
router.put('/:id',userController.updateUser);

//delete a user route
router.delete('/:id',userController.deleteUser);


module.exports = router;