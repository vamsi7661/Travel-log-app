const express = require("express");
const router = express.Router();

const userController=require("../controllers/users")

router.get("/",userController.getUsers);
router.post("/signup",userController.postUser);
router.post("/login",userController.loginUser);
router.delete("/:userId", userController.deleteUser);


module.exports = router;
