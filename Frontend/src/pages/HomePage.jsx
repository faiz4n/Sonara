import { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import MusicList from "../components/music/MusicList";
import { getAllMusic } from "../services/music.service";
import Spinner from "../components/UI/Spinner";

function HomePage() {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchMusic() {
      try {
        const response = await getAllMusic(setIsLoading);
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
      {!isLoading && (
        <>
          <PageHeader heading={headers.heading} caption={headers.caption} />

          <div className="md:p-5">
            <MusicList tracks={tracks} />
          </div>
        </>
      )}
      {isLoading && <Spinner message={"Loading..."} />}
    </>
  );
}

export default HomePage;
