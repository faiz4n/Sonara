import { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import AlbumList from "../components/music/AlbumList";
import { getAllAlbums } from "../services/music.service";
import Spinner from "../components/UI/Spinner";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchAlbums() {
      try {
        const response = await getAllAlbums(setIsLoading);
        setAlbums((response && response.albums) || []);
      } catch (err) {
        console.error("Failed to fetch albums:", err);
        setAlbums([]);
      }
    }
    fetchAlbums();
  }, []);

  const headers = {
    heading: "Albums",
    caption: "Browse albums and releases",
  };
  return (
    <>
      {!isLoading && (
        <>
          <PageHeader heading={headers.heading} caption={headers.caption} />
          <div className="p-5">
            <AlbumList albums={albums} />
          </div>
        </>
      )}
      {isLoading && <Spinner message={"Loading..."} />}
    </>
  );
}

export default Albums;
