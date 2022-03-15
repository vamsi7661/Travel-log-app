const mongoose = require("mongoose");
const User = require("../models/users")
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.getUsers = (req, res, next) => {
  User.find()
    .select("username email _id")
    .exec()
    .then((result) => {
      if (result.length >= 0) {
        res.status(200).json({
          message: "Users were fetched",
          users_count: result.length,
          users: result,
        });
      } else {
        res.status(404).json({
          message: "Users were not found",
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: err.message,
      })
    );
};

exports.postUser=(req, res, next) => {
    User.findOne({ username: req.body.username })
      .exec()
      .then((user) => {
        if (user !== null) {
          return res.status(409).json({
            message: "username alredy exist",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (error, result) => {
            if (error) {
              return res.status(500).json({
                error: error.message,
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                password: result,
              });
              user
                .save()
                .then((result) => {
                  res.status(201).json({
                    message: "User created successfully",
                  });
                })
                .catch((error) => {
                  if (error.code === 11000) {
                    return res.status(409).json({
                      error: "Email alredy exist",
                    });
                  }
                  res.status(500).json({
                    error: error.message,
                  });
                });
            }
          });
        }
      });
  }

exports.loginUser=(req, res, next) => {
    User.findOne({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user === null) {
          return res.status(404).json({
            message: "Email address not found",
          });
        } else {
          bcrypt.compare(req.body.password, user.password, (error, result) => {
            if (!result) {
              return res.status(404).json({
                message: "Invalid Password",
              });
            }
            if (result) {
              const payload = {
                username: user.username,
                email: user.email,
                user_id: user._id,
              };
              const jwt_token = jwt.sign(payload, process.env.MY_SECRET_KEY, {
                expiresIn: "7 days",
              });
              return res.status(200).json({
                message: "login Successfull",
                token: jwt_token,
              });
            }
          });
        }
      })
      .catch((err) =>
        res.status(500).json({
          error: err.message,
        })
      );
  }

exports.deleteUser=(req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "User deleted",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err.message,
        });
      });
  }  

