import { useEffect, useState } from "react";
import ArtistTrackList from "../components/artist/ArtistTrackList";
import CreateAlbumForm from "../components/forms/CreateAlbumForm";
import UploadMusicForm from "../components/forms/UploadMusicForm";
import PageHeader from "../components/layout/PageHeader";
import { getMyMusic } from "../services/music.service";
import ArtistAlbumList from "../components/artist/ArtistAlbumList";

function ArtistStudio() {
  const [trackList, setTrackList] = useState([]);
  const [songTitle, setSongTitle] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(function () {
    async function fetchArtistMusic() {
      const result = await getMyMusic();
      setTrackList(result);
    }
    fetchArtistMusic();
  }, []);
  const headers = {
    heading: "Artist Studio",
    caption: "Mangage your tracks and organize your discography",
  };
  return (
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
      />

      <div className="flex justify-center">
        <ArtistTrackList trackList={trackList} setTrackList={setTrackList} />
      </div>
    </>
  );
}

export default ArtistStudio;
