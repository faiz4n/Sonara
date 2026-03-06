import api from "./api";

export async function getAllMusic() {
  const response = await api.get("/api/music");
  return response.data;
}

export async function getMyMusic() {
  const response = await api.get("/api/music/me");
  return response.data.result;
}

export async function deleteMusicById(id) {
  const response = await api.post(`/api/music/delete/${id}`);
  console.log(response);
  return response.data;
}

export async function getAllAlbums() {
  const response = await api.get("/api/music/album");
  return response.data;
}

export async function uploadMusic(formData, setIsUploading, setUploadSuccess) {
  setIsUploading(true);
  try {
    const response = await api.post("/api/music/upload", formData);

    console.log(response);
    setUploadSuccess(true);
    return response.data;
  } catch (err) {
    setUploadSuccess(false);
    throw err;
  } finally {
    setIsUploading(false);
  }
}

export async function createAlbum(formData, setIsUploading, setUploadSuccess) {
  try {
    setIsUploading(true);
    const response = await api.post("/api/music/album", formData);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  } finally {
    setIsUploading(false);
    setUploadSuccess(true);
  }
}
