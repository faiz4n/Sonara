import { Library, ImagePlus, ListPlus, Upload, X } from "lucide-react";
import TrackSelector from "../UI/TrackSelector";
import TextInput from "../UI/TextInput";
import Button from "../UI/Button";
import FormHeading from "../UI/FormHeading";
import { useState } from "react";
import FileUploadField from "../UI/FileUploadField";
import { createAlbum } from "../../services/music.service";
import Spinner from "../UI/Spinner";

function CreateAlbumForm({ trackList, resetModal, setAlbums }) {
  const [albumTitle, setAlbumTitle] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [albumArtFile, setAlbumArtFile] = useState(null);
  const [albumArtName, setAlbumArtName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateAlbum(e) {
    e.preventDefault();
    setError("");

    let validationError = "";
    if (!albumTitle.length) validationError = "Album Title is required";
    else if (selectedTracks.length === 0)
      validationError = "Select at least one track";
    else if (!albumArtFile) validationError = "Album Art is required";

    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = new FormData();
    formData.append("title", albumTitle);
    selectedTracks.forEach((trackId) => {
      formData.append("musics[]", trackId);
    });
    formData.append("file", albumArtFile);

    setIsUploading(true);

    try {
      const result = await createAlbum(
        formData,
        setIsUploading,
        setUploadSuccess,
      );
      console.log("album creation result : ", result);
      if (result) {
        setAlbums((prev) => [...prev, result.album]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (
        !allowedTypes.includes(file.type) &&
        !file.name.match(/\.(jpg|jpeg|png)$/i)
      ) {
        alert("Please select a valid image file (.jpg, .jpeg, .png)");
        e.target.value = "";
        return;
      }

      setAlbumArtName(file.name);
      setAlbumArtFile(file);
    }
  }

  function handleFormReset() {
    setUploadSuccess(false);
    setAlbumArtFile(null);
    setAlbumArtName("");
    resetModal();
  }

  return (
    <form
      onSubmit={handleCreateAlbum}
      className="flex flex-col mx-2 bg-green-950 gap-2 py-5 px-5 border-2 max-w-90 w-full  border-zinc-200/20 rounded-lg"
    >
      {!isUploading && !uploadSuccess && (
        <>
          <FormHeading heading={"Create Album"} icon={Library} />

          {error && (
            <p className="text-red-400 text-xs text-center bg-red-500/30 p-2 rounded">
              {error}
            </p>
          )}

          <div className="w-full">
            <TextInput
              label={"Album Title"}
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
              placeholder={"Enter album title"}
            />
            <TrackSelector
              trackList={trackList}
              setSelectedTracks={setSelectedTracks}
            />
            <FileUploadField
              handleFileChange={handleFileChange}
              isUploading={isUploading}
              fileName={albumArtName}
              icon={ImagePlus}
              types={".jpg,.jpeg,.png"}
              label={"Track Cover Image"}
            />
            <div className="flex gap-2">
              <Button
                label={"Create Album"}
                icon={ListPlus}
                onClick={handleCreateAlbum}
              />
              <button
                onClick={resetModal}
                className="bg-red-500 hover:bg-red-600 rounded-md cursor-pointer flex justify-center gap-1 mt-3 items-center p-2 text-sm font-semibold"
              >
                <X />
                Close
              </button>
            </div>
          </div>
        </>
      )}
      {isUploading && <Spinner message={"Creating album..."} />}

      {uploadSuccess && (
        <div className=" flex flex-col items-center justify-center h-full">
          <p className="text-md text-green-500">Album successfully created!</p>
          <Button
            label={"Done"}
            onClick={() => {
              if (uploadSuccess) {
                handleFormReset();
                return;
              }
            }}
          />
        </div>
      )}
    </form>
  );
}

export default CreateAlbumForm;
