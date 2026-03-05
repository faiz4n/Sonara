import { Check, CloudUpload, ImagePlus, Upload } from "lucide-react";
import FileUploadField from "../UI/FileUploadField";
import { FileHeadphone } from "lucide-react";
import TextInput from "../UI/TextInput";
import Button from "../UI/Button";
import FormHeading from "../UI/FormHeading";
import { useState } from "react";
import { uploadMusic } from "../../services/music.service";
import UploadSpinner from "../UI/UploadSpinner";

function UploadMusicForm({ setTrackList, resetModal }) {
  const [songTitle, setSongTitle] = useState("");
  const [musicFile, setMusicFile] = useState(null);
  const [musicFileName, setMusicFileName] = useState("");
  const [imageCoverFile, setImageCoverFile] = useState(null);
  const [coverImageName, setCoverImageName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);

  function handleFileChange(e, fileType) {
    const file = e.target.files[0];

    if (fileType === "audio") {
      //File format validation for audio
      if (file) {
        const allowedTypes = [
          "audio/mpeg",
          "audio/wav",
          "audio/flac",
          "audio/x-flac",
        ];
        if (
          !allowedTypes.includes(file.type) &&
          !file.name.match(/\.(mp3|wav|flac)$/i)
        ) {
          alert("Please select a valid audio file (.mp3, .wav, .flac)");
          e.target.value = "";
          return;
        }

        //Extract audio duration
        const audio = new Audio(URL.createObjectURL(file));
        audio.onloadedmetadata = () => {
          const duration = audio.duration;
          file.duration = duration;

          setMusicFileName(file.name);
          setMusicFile(file);
        };
      }
    } else if (fileType === "cover") {
      //File format validation for cover image
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

        setCoverImageName(file.name);
        setImageCoverFile(file);
      }
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    setError("");

    let validationError = "";
    if (!songTitle.length) validationError = "Song Title is required";
    else if (!musicFile) validationError = "Music File is required";
    else if (!imageCoverFile) validationError = "Cover Image is required";

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!musicFile || !imageCoverFile || !songTitle || !coverImageName) return;

    const formData = new FormData();
    formData.append("files", musicFile);
    formData.append("files", imageCoverFile);
    formData.append("title", songTitle);
    formData.append("duration", Math.round(musicFile.duration));

    try {
      const result = await uploadMusic(
        formData,
        setIsUploading,
        setUploadSuccess,
      );
      if (result) setTrackList((prev) => [result.music, ...prev]);
      console.log(result);
    } catch (err) {
      console.log("Upload failed: ", err);

      setError(err.response?.data?.msg || "Something went wrong");
    }
  }

  function handleFormReset() {
    setUploadSuccess(false);
    setMusicFile(null);
    setImageCoverFile(null);
    setMusicFileName("");
    setCoverImageName("");
    setSongTitle("");
    resetModal();
  }

  return (
    <form className="flex flex-col  bg-green-950 gap-2 py-5 px-5 border-2 max-w-95 w-full  border-zinc-200/20 rounded-lg">
      {!isUploading && !uploadSuccess && (
        <>
          <div className="flex items-center gap-2">
            <FormHeading heading={"Upload Music"} icon={CloudUpload} />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center bg-red-500/30 p-2 rounded">
              {error}
            </p>
          )}

          <div className="w-full">
            <TextInput
              label={"Song Title"}
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              placeholder={"Enter track title"}
            />
            <p className="text-[11px] my-1 text-zinc-300">Audio File</p>
            <div className="flex gap-2 h-32">
              <FileUploadField
                handleFileChange={(e) => handleFileChange(e, "audio")}
                isUploading={isUploading}
                fileName={musicFileName}
                icon={FileHeadphone}
                types={".mp3,.flac,.wav"}
                label={"MP3, FLAC or WAV only"}
              />
              <FileUploadField
                handleFileChange={(e) => handleFileChange(e, "cover")}
                isUploading={isUploading}
                fileName={coverImageName}
                icon={ImagePlus}
                types={".jpg,.jpeg,.png"}
                label={"Track Cover Image"}
              />
            </div>
            <Button
              label={!uploadSuccess ? "Upload Track" : "Done"}
              icon={uploadSuccess ? Check : Upload}
              onClick={handleUpload}
            />
          </div>
        </>
      )}
      {isUploading && <UploadSpinner />}

      {uploadSuccess && (
        <div className=" flex flex-col items-center justify-center h-full">
          <p className="text-md text-green-500">
            Your track is successfully uploaded!
          </p>
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

export default UploadMusicForm;
