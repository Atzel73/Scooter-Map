import React from "react";
import * as ImagePicker from "expo-image-picker";
import { imageToBlob } from "../imageBlob/imageBlob";
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });

  if (!result.canceled) {
    const image = await imageToBlob(result.assets[0].uri);
    return result.assets[0].uri;
  }
};

export default pickImage;
