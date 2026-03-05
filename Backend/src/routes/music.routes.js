const express = require("express");
const musicController = require("../controllers/music.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

//Music Routes
router.get("/", musicController.getAllMusic);
router.post(
  "/upload",
  authMiddleware.authArtist,
  upload.array("files", 2),
  musicController.createMusic,
);
router.post(
  "/delete/:musicId",
  authMiddleware.authArtist,
  musicController.deleteMusicById,
);
router.get("/me", authMiddleware.authArtist, musicController.getMyMusic);

//Album Routes
router.post(
  "/album",
  authMiddleware.authArtist,
  upload.single("file"),
  musicController.createAlbum,
);
router.get("/album", musicController.getAllAlbums);
router.get("/album/:albumId", musicController.getAlbumById);

module.exports = router;
