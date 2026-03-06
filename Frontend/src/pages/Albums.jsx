import { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import AlbumList from "../components/music/AlbumList";
import { getAllAlbums } from "../services/music.service";

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(function () {
    async function fetchAlbums() {
      const response = await getAllAlbums();
      console.log(response.albums);
      setAlbums(response.albums);
    }
    fetchAlbums();
  }, []);

  const headers = {
    heading: "Albums",
    caption: "Browse albums and releases",
  };
  return (
    <>
      <PageHeader heading={headers.heading} caption={headers.caption} />
      <div className="p-5">
        <AlbumList albums={albums} />
      </div>
    </>
  );
}

export default Albums;
