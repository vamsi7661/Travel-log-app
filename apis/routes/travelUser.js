const express = require("express");
const router = express.Router();
const multer = require("multer");
const path=require("path")


const memoriesController = require("../controllers/travelUsers");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "/Users/Vamsi Krishna/Desktop/Travel log/server/images");
  },
  filename : function(req, file, cb) {
    cb(null, file.fieldname + '-'+ Date.now()+path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload=multer({storage:storage,limits:{fileSize:1024*1024*5},fileFilter:fileFilter})



// let upload = multer();
// upload.single(),
router.post("/memorie",upload.array('images_of_location',10), memoriesController.postMemorie);
router.get("/memories", memoriesController.getMemories);
router.get("/:memorieId", memoriesController.getMemorie);
router.delete("/:memorieId", memoriesController.getMemorie);
// add get memorire by userid
module.exports = router;
