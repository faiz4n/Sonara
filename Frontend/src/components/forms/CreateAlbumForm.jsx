import { Disc, ImagePlus, ListPlus, Upload } from "lucide-react";
import TrackSelector from "../UI/TrackSelector";
import TextInput from "../UI/TextInput";
import Button from "../UI/Button";
import FormHeading from "../UI/FormHeading";
import { useState } from "react";
import FileUploadField from "../UI/FileUploadField";

function CreateAlbumForm({ trackList }) {
  const [albumTitle, setAlbumTitle] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [albumArtFile, setAlbumArtFile] = useState(null);
  const [albumArtName, setAlbumArtName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleCreateAlbum(e) {
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
    formData.append("musics", JSON.stringify(selectedTracks));
    formData.append("albumArt", albumArtFile);

    // TODO: Call API to create album with formData
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

  return (
    <form
      onSubmit={handleCreateAlbum}
      className="flex flex-col  bg-green-950 gap-2 py-5 px-5 border-2 max-w-90 w-full  border-zinc-200/20 rounded-lg"
    >
      <FormHeading heading={"Create Album"} icon={Disc} />

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
        <Button label={"Create Album"} icon={ListPlus} />
      </div>
    </form>
  );
}

export default CreateAlbumForm;
