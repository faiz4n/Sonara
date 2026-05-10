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
      if (!albumId) return; // Don't fetch if albumId is not yet available
      async function fetchAlbumById() {
        const result = await getAlbumById(albumId, setIsLoading);
        setAlbum((prev) => result?.album || null);
      }
      fetchAlbumById();
    },
    [albumId],
  );

  async function handleDeleteAlbum(id) {
    try {
      const result = await deleteAlbumById(id);
      navigate(-1);
    } catch (err) {
      console.error("Failed to delete album:", err);
      alert("Failed to delete album. Please try again.");
    }
  }

  return (
    <>
      {isLoading && <Spinner message={"Loading..."} />}
      {!isLoading && (
        <div className="p-4 md:p-10">
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
