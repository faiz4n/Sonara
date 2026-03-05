require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = require("./src/models/user.model");
const musicModel = require("./src/models/music.model");
const albumModel = require("./src/models/album.model");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");

  // Drop all documents
  await userModel.deleteMany({});
  await musicModel.deleteMany({});
  await albumModel.deleteMany({});
  console.log("Cleared all collections");

  const hash = await bcrypt.hash("password123", 10);

  // 1 regular user
  const user = await userModel.create({
    username: "listener1",
    email: "listener1@sonara.com",
    password: hash,
    role: "listener",
  });
  console.log("Created user:", user.username);

  // 3 artists
  const artist1 = await userModel.create({
    username: "aurora_waves",
    email: "aurora@sonara.com",
    password: hash,
    role: "artist",
  });

  const artist2 = await userModel.create({
    username: "neon_pulse",
    email: "neon@sonara.com",
    password: hash,
    role: "artist",
  });

  const artist3 = await userModel.create({
    username: "velvet_echo",
    email: "velvet@sonara.com",
    password: hash,
    role: "artist",
  });
  console.log("Created 3 artists");

  // --- Songs for Artist 1: aurora_waves ---
  const a1Songs = await musicModel.insertMany([
    {
      title: "Midnight Glow",
      artist: artist1._id,
      uri: "https://placeholder.audio/midnight-glow.mp3",
    },
    {
      title: "Ocean Drift",
      artist: artist1._id,
      uri: "https://placeholder.audio/ocean-drift.mp3",
    },
    {
      title: "Sunrise Cascade",
      artist: artist1._id,
      uri: "https://placeholder.audio/sunrise-cascade.mp3",
    },
    {
      title: "Crystal Rain",
      artist: artist1._id,
      uri: "https://placeholder.audio/crystal-rain.mp3",
    },
    {
      title: "Silent Aurora",
      artist: artist1._id,
      uri: "https://placeholder.audio/silent-aurora.mp3",
    },
  ]);

  // --- Songs for Artist 2: neon_pulse ---
  const a2Songs = await musicModel.insertMany([
    {
      title: "Electric Nights",
      artist: artist2._id,
      uri: "https://placeholder.audio/electric-nights.mp3",
    },
    {
      title: "Cyber Loop",
      artist: artist2._id,
      uri: "https://placeholder.audio/cyber-loop.mp3",
    },
    {
      title: "Neon Highway",
      artist: artist2._id,
      uri: "https://placeholder.audio/neon-highway.mp3",
    },
    {
      title: "Pulse Code",
      artist: artist2._id,
      uri: "https://placeholder.audio/pulse-code.mp3",
    },
  ]);

  // --- Songs for Artist 3: velvet_echo ---
  const a3Songs = await musicModel.insertMany([
    {
      title: "Velvet Skies",
      artist: artist3._id,
      uri: "https://placeholder.audio/velvet-skies.mp3",
    },
    {
      title: "Echo Chamber",
      artist: artist3._id,
      uri: "https://placeholder.audio/echo-chamber.mp3",
    },
    {
      title: "Soft Thunder",
      artist: artist3._id,
      uri: "https://placeholder.audio/soft-thunder.mp3",
    },
    {
      title: "Phantom Waves",
      artist: artist3._id,
      uri: "https://placeholder.audio/phantom-waves.mp3",
    },
    {
      title: "Dusk Serenade",
      artist: artist3._id,
      uri: "https://placeholder.audio/dusk-serenade.mp3",
    },
    {
      title: "Amber Light",
      artist: artist3._id,
      uri: "https://placeholder.audio/amber-light.mp3",
    },
  ]);
  console.log("Created songs for all artists");

  // --- Albums ---
  await albumModel.create({
    title: "Waves of Light",
    artist: artist1._id,
    musics: [a1Songs[0]._id, a1Songs[1]._id, a1Songs[2]._id],
  });

  await albumModel.create({
    title: "Crystal Sessions",
    artist: artist1._id,
    musics: [a1Songs[3]._id, a1Songs[4]._id],
  });

  await albumModel.create({
    title: "Digital Dreams",
    artist: artist2._id,
    musics: [a2Songs[0]._id, a2Songs[1]._id, a2Songs[2]._id, a2Songs[3]._id],
  });

  await albumModel.create({
    title: "Echoes in Velvet",
    artist: artist3._id,
    musics: [a3Songs[0]._id, a3Songs[1]._id, a3Songs[2]._id],
  });

  await albumModel.create({
    title: "Twilight Frequencies",
    artist: artist3._id,
    musics: [a3Songs[3]._id, a3Songs[4]._id, a3Songs[5]._id],
  });

  console.log("Created albums");

  console.log("\n--- Seed Summary ---");
  console.log(`Users: 1 (listener1 / password123)`);
  console.log(
    `Artists: 3 (aurora_waves, neon_pulse, velvet_echo / password123)`,
  );
  console.log(`Songs: ${a1Songs.length + a2Songs.length + a3Songs.length}`);
  console.log(`Albums: 5`);

  await mongoose.disconnect();
  console.log("Done!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
