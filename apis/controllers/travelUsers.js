const mongoose = require("mongoose");
const TravelUser = require("../models/travelUsers");
var FileReader = require("filereader");
var fs = require("fs");
// req.files.map((eachImg)=>eachImg.path),

exports.postMemorie = (req, res, next) => {
  // console.log(req.files, "files");
  function getBase64(file) {
    const img = fs.readFileSync(file.path);
    const encoded_img = img.toString("base64");

    const final_img = Buffer.from(encoded_img, "base64");
    return final_img;
  }

  const myFiles = req.files.map((eachFile) => getBase64(eachFile));


  const travelUser = new TravelUser({
    _id: new mongoose.Types.ObjectId(),
    user_id: req.body.user_id,
    location: req.body.location,
    cost_of_travel: req.body.cost_of_travel,
    places_to_visit: req.body.places_to_visit,
    transportation: req.body.transportation,
    saftey: req.body.saftey,
    hotels_to_stay: req.body.hotels_to_stay,
    famous_food: req.body.famous_food,
    your_experience: req.body.your_experience,
    images_of_location: myFiles,
    Others: req.body.Others,
  });
  travelUser
    .save()
    .then((result) =>
      res.status(201).json({
        message: "Memorie added successfully",
        Memorie: result,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: err.message,
      })
    );
};

exports.getMemories = (req, res, next) => {
  TravelUser.find()
    .exec()
    .then((result) => {
      if (result.length >= 0) {
        res.status(200).json({
          message: "Memories were fetched",
          memories_count: result.length,
          memories: result,
        });
      } else {
        res.status(404).json({
          message: "Memories were not found",
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: err.message,
      })
    );
};

exports.getMemorie = (req, res, next) => {
  const id = req.params.memorieId;
  TravelUser.find({ _id: id })
    .exec()
    .then((result) => {
      if (result.length >= 0) {
        res.status(200).json({
          message: "Here is your memorie",
          memorie: result,
        });
      } else {
        res.status(404).json({
          message: "Memorie were not found",
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: err.message,
      })
    );
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.memorieId;
  TravelUser.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Memorie deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};
