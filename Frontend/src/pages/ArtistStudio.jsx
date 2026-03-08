import { useEffect, useState } from "react";
import ArtistTrackList from "../components/artist/ArtistTrackList";
import CreateAlbumForm from "../components/forms/CreateAlbumForm";
import UploadMusicForm from "../components/forms/UploadMusicForm";
import PageHeader from "../components/layout/PageHeader";
import {
  getAllAlbums,
  getMyAlbums,
  getMyMusic,
} from "../services/music.service";
import ArtistAlbumList from "../components/artist/ArtistAlbumList";
import Spinner from "../components/UI/Spinner";

function ArtistStudio() {
  const [trackList, setTrackList] = useState([]);
  const [songTitle, setSongTitle] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState([]);

  useEffect(function () {
    async function fetchArtistMusic() {
      const result = await getMyMusic();
      setTrackList(result);
    }
    fetchArtistMusic();
  }, []);

  useEffect(function () {
    async function fetchMyAlbums() {
      const response = await getMyAlbums(setIsLoading);
      setAlbums(response.albums);
    }
    fetchMyAlbums();
  }, []);
  console.log(albums);
  const headers = {
    heading: "Artist Studio",
    caption: "Mangage your tracks and organize your discography",
  };
  return (
    <>
      {!isLoading && (
        <>
          <PageHeader heading={headers.heading} caption={headers.caption} />
          <ArtistAlbumList
            songTitle={songTitle}
            setSongTitle={setSongTitle}
            file={file}
            setFile={setFile}
            fileName={fileName}
            setFileName={setFileName}
            trackList={trackList}
            setTrackList={setTrackList}
            albums={albums}
            setAlbums={setAlbums}
          />

          <div className="flex justify-center">
            <ArtistTrackList
              trackList={trackList}
              setTrackList={setTrackList}
            />
          </div>
        </>
      )}
      {isLoading && <Spinner message="Loading..." />}
    </>
  );
}

export default ArtistStudio;
