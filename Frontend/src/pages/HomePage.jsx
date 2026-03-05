import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import MusicList from "../components/music/MusicList";
import { getAllMusic } from "../services/music.service";

function HomePage() {
  const [tracks, setTracks] = useState([]);

  useEffect(function () {
    async function fetchMusic() {
      try {
        const response = await getAllMusic();
        console.log(response.musics);
        setTracks(response.musics);
      } catch {
        setTracks([]);
      }
    }
    fetchMusic();
  }, []);

  console.log(tracks);

  const headers = {
    heading: "Home",
    caption: "Discover and play music",
  };
  return (
    <>
      <Header heading={headers.heading} caption={headers.caption} />
      <div className="p-5">
        <MusicList tracks={tracks} />
      </div>
    </>
  );
}

export default HomePage;
