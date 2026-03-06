import { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
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
      <PageHeader heading={headers.heading} caption={headers.caption} />
      <div className="md:p-5">
        <MusicList tracks={tracks} />
      </div>
    </>
  );
}

export default HomePage;
