const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadMusic, uploadAlbumArt } = require("../services/storage.service");

async function createMusic(req, res) {
  const { title, duration } = req.body;

  const [musicFile, coverImageFile] = req.files;

  if (!musicFile || !coverImageFile) {
    return res.status(400).json({ msg: "Missing music or cover image file" });
  }

  const musicResult = await uploadMusic(musicFile.buffer.toString("base64"));
  const coverImageResult = await uploadMusic(
    coverImageFile.buffer.toString("base64"),
  );

  const music = await musicModel.create({
    uri: musicResult.url,
    title,
    duration,
    coverImage: coverImageResult.url,
    artist: req.user.id,
  });

  res.status(201).json({ msg: "Music created successfully", music });
}

async function createAlbum(req, res) {
  const { title, musics } = req.body;
  const albumArtFile = req.file;

  if (!albumArtFile)
    return res.status(400).json({ msg: "Missing album art file" });

  const albumResult = await uploadAlbumArt(
    albumArtFile.buffer.toString("base64"),
  );

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    albumArt: albumResult.url,
    musics: musics,
  });

  res.status(201).json({
    msg: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      albumArt: album.albumArt,
      musics: album.musics,
    },
  });
}

async function getAllMusic(req, res) {
  const musics = await musicModel.find().populate("artist");

  return res.status(200).json({ msg: "Music fetched successfully", musics });
}

async function getMyMusic(req, res) {
  const result = await musicModel
    .find({ artist: req.user.id })
    .populate("artist", "username");

  return res.status(200).json({ msg: "artist musics fetched", result });
}

async function deleteMusicById(req, res) {
  const id = req.params.musicId;

  const result = await musicModel.findByIdAndDelete(id);
  return res.status(201).json({ msg: "Deleted Track", result });
}

async function getAllAlbums(req, res) {
  const albums = await albumModel.find().populate("artist");

  return res
    .status(200)
    .json({ msg: "All albums fetched successfully", albums });
}

async function getAlbumById(req, res) {
  const albumId = req.params.albumId;

  const album = await albumModel.findById(albumId);

  return res.status(200).json({ msg: "Album fethced successfully", album });
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusic,
  getAllAlbums,
  getAlbumById,
  getMyMusic,
  deleteMusicById,
};
