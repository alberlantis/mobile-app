import { Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { type CameraCapturedPicture, useCameraPermissions } from "expo-camera";

export type SatlantisImage =
  | CameraCapturedPicture
  | ImagePicker.ImagePickerAsset
  | undefined;

type UpdatePhoto = {
  setPhoto(photo: SatlantisImage): void;
  setCamera(value: boolean): void;
};

const useUpdatePhoto = ({ setCamera, setPhoto }: UpdatePhoto) => {
  const [permission, requestPermission] = useCameraPermissions();

  const handleImageGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;
    setPhoto(result.assets[0]);
  };
  const handleCamera = async () => {
    if (permission?.granted) {
      setCamera(true);
      return;
    }
    if (!!permission?.canAskAgain) {
      const permissionResponse = await requestPermission();
      setCamera(permissionResponse.granted);
      return;
    }
    Alert.alert(
      "Permissions Denied!",
      "Please go to you app settings and grant camera permission",
      [
        {
          text: "Go to settings",
          onPress: Linking.openSettings,
        },
      ],
    );
    setCamera(false);
  };

  const handleSelectAvatar = () => {
    Alert.alert("Upload Photo", "", [
      {
        text: "Take Photo",
        onPress: handleCamera,
      },
      {
        text: "Choose Existing",
        onPress: handleImageGallery,
      },
      {
        text: "Cancel",
      },
    ]);
  };

  return { handleSelectAvatar };
};

export default useUpdatePhoto;
