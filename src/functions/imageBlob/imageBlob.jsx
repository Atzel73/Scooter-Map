import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../db/conection";

export const imageToBlob = async (image) => {
  const storage = getStorage(app);
  const response = await fetch(image);
  const blob = await response.blob();
  const filename = image.substring(image.lastIndexOf("/") + 1);

  const storageRef = ref(storage, "user-photo/" + `${filename}`);
  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Error al subir la imagen:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL); // Resuelve con la URL
          })
          .catch((error) => {
            console.error("Error al obtener la URL:", error);
            reject(error);
          });
      }
    );
  });
};
