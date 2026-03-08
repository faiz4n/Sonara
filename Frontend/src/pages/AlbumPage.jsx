import { MoveLeft } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { deleteAlbumById, getAlbumById } from "../services/music.service";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import AlbumHeader from "../components/album/AlbumHeader";
import AlbumTrackList from "../components/album/AlbumTrackList";

function AlbumPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState(null);
  const { albumId } = useParams();
  const navigate = useNavigate();

  useEffect(
    function () {
      async function fetchAlbumById() {
        const result = await getAlbumById(albumId, setIsLoading);
        setAlbum((prev) => result.album);
      }
      fetchAlbumById();
    },
    [albumId],
  );

  async function handleDeleteAlbum(id) {
    const result = await deleteAlbumById(id);
    navigate(-1);
    console.log(result);
  }

  return (
    <>
      {isLoading && <Spinner message={"Loading..."} />}
      {!isLoading && (
        <div className="p-10">
          <button
            className="flex gap-2 mb-5 cursor-pointer text-green-500"
            onClick={() => navigate(-1)}
          >
            <MoveLeft />
            Back
          </button>

          <AlbumHeader
            album={album}
            albumId={albumId}
            onDelete={handleDeleteAlbum}
          />
          <AlbumTrackList album={album} />
        </div>
      )}
    </>
  );
}

export default AlbumPage;
