import { useEffect, useState } from "react";
import { getAllAlbums } from "../../services/music.service";
import AlbumItem from "../music/AlbumItem";
import { CirclePlus, Disc, Minus, Plus, Upload, X } from "lucide-react";
import DropDown from "../UI/DropDown";
import UploadMusicForm from "../forms/UploadMusicForm";
import CreateAlbumForm from "../forms/CreateAlbumForm";

function ArtistAlbumList({ trackList, setTrackList }) {
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
      <CreateAlbumForm
        resetModal={resetModal}
        trackList={trackList}
        setAlbums={setAlbums}
      />,
    );
  }

  function resetModal() {
    setIsModelOpen(false);
    setIsDropdownOpen(false);
    setModalContent(null);
  }

  return (
    <div className="m-7">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed flex justify-center items-center inset-0 bg-black/50 backdrop-blur-sm z-50">
          {modalContent}
        </div>
      )}

      {/* Album List */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold w-full ">Your Albums</h1>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-14 h-14 md:w-17 md:h-17 fixed bottom-[12%] md:bottom-[8%] md:right-[5%] right-[7%] z-40 flex justify-center items-center p-2 rounded-full cursor-pointer gap-2 bg-green-500 hover:bg-green-600 shadow-lg shadow-green-400/20 active:scale-95 outline-none transition-all"
          >
            {isDropdownOpen ? <Minus /> : <Plus />}
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
        <div className="grid 2xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4 lg:place-items-center md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-5">
          {albums.map((album) => (
            <AlbumItem
              key={album._id}
              title={album.title}
              albumArt={album.albumArt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistAlbumList;
