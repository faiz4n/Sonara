const imagekit = require("@imagekit/nodejs");

const ImageKitInstance = new imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadMusic(file) {
  const result = await ImageKitInstance.files.upload({
    file,
    fileName: "music_" + Date.now(),
    folder: process.env.IMAGEKIT_MUSIC_FOLDER || "faizans/music",
  });
  return result;
}

async function uploadAlbumArt(file) {
  const result = await ImageKitInstance.files.upload({
    file,
    fileName: "album_art" + Date.now(),
    folder: process.env.IMAGEKIT_ALBM_ART_FOLDER || "faizan/albumArt",
  });
  return result;
}

module.exports = { uploadMusic, uploadAlbumArt };
