import api from "./api";

export async function getAllMusic(setIsLoading) {
  try {
    setIsLoading(true);
    const response = await api.get("/api/music");
    return response.data;
  } catch (err) {
    console.log(err);
    return { musics: [] };
  } finally {
    setIsLoading(false);
  }
}

export async function getMyMusic() {
  try {
    const response = await api.get("/api/music/me");
    return response.data.result || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function deleteMusicById(id) {
  const response = await api.post(`/api/music/delete/${id}`);
  console.log(response);
  return response.data;
}

export async function deleteAlbumById(id) {
  const response = await api.post(`/api/music/album/delete/${id}`);
  console.log(response);
  return response.data;
}

export async function getAllAlbums(setIsLoading) {
  try {
    setIsLoading(true);
    const response = await api.get("/api/music/album");
    return response.data;
  } catch (err) {
    console.log(err);
    return { albums: [] };
  } finally {
    setIsLoading(false);
  }
}

export async function getMyAlbums(setIsLoading) {
  try {
    setIsLoading(true);
    const result = await api.get("/api/music/album/me");
    return result.data;
  } catch (err) {
    console.log(err);
    return { albums: [] };
  } finally {
    setIsLoading(false);
  }
}

export async function getAlbumById(id, setIsLoading) {
  try {
    setIsLoading(true);
    const response = await api.get(`/api/music/album/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return { album: null };
  } finally {
    setIsLoading(false);
  }
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
    setUploadSuccess(true);
    return response.data;
  } catch (err) {
    console.log(err);
    setUploadSuccess(false);
    return null;
  } finally {
    setIsUploading(false);
  }
}
