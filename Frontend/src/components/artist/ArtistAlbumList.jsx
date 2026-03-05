import { useEffect, useState } from "react";
import { getAllAlbums } from "../../services/music.service";
import AlbumItem from "../music/AlbumItem";
import { CirclePlus, Disc, Upload, X } from "lucide-react";
import DropDown from "../UI/DropDown";
import UploadMusicForm from "../forms/UploadMusicForm";
import CreateAlbumForm from "../forms/CreateAlbumForm";

function ArtistAlbumList({
  songTitle,
  setSongTitle,
  file,
  setFile,
  fileName,
  setFileName,
  trackList,
  setTrackList,
}) {
  const [albums, setAlbums] = useState([]);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(function () {
    async function fetchAlbums() {
      const response = await getAllAlbums();
      setAlbums(response.albums);
    }
    fetchAlbums();
  }, []);

  function handleNewTrack() {
    setIsModelOpen(true);
    setModalContent(
      <UploadMusicForm resetModal={resetModal} setTrackList={setTrackList} />,
    );
  }

  function handleNewAlbum() {
    setIsModelOpen(true);
    setModalContent(
      <CreateAlbumForm resetModal={resetModal} trackList={trackList} />,
    );
  }

  function resetModal() {
    setIsModelOpen(false);
    setIsDropdownOpen(false);
    setModalContent(null);
  }

  return (
    <div className="m-7">
      {isModalOpen && (
        <div className="fixed flex justify-center items-center inset-0 bg-black/50 backdrop-blur-sm z-50">
          <button
            onClick={resetModal}
            className="absolute right-20 top-8 bg-green-950 p-2 rounded-md cursor-pointer px-3 flex justify-center gap-2"
          >
            <X />
            Close
          </button>
          {modalContent}
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold w-full ">Your Albums</h1>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-40  flex justify-center p-2 rounded-md cursor-pointer gap-2 bg-green-600"
          >
            <CirclePlus /> New
          </button>
          {isDropdownOpen && (
            <DropDown
              dropDownList={[
                {
                  label: "Upload New Track",
                  icon: Upload,
                  onClick: handleNewTrack,
                },
                {
                  label: "Create New Album",
                  icon: Disc,
                  onClick: handleNewAlbum,
                },
              ]}
            />
          )}
        </div>
      </div>
      <div className="mt-7">
        <ul className="flex gap-5 flex-wrap">
          {albums.map((album) => (
            <li key={album._id}>
              <AlbumItem title={album.title} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ArtistAlbumList;
