import React, { useState } from "react";
import { View, Pressable, Image, Alert, Linking } from "react-native";
import { type CameraCapturedPicture, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import { Icon, Camera } from "src/shared/components";
import { colors, fonts } from "src/theme";
import s from "./UploadAvatar.style";

const UploadAvatar = () => {
  const [toggleCamera, setToggleCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [avatar, setAvatar] = useState<
    CameraCapturedPicture | ImagePicker.ImagePickerAsset | undefined
  >();

  const handleImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  };
  const handleCamera = async () => {
    if (permission?.granted) {
      setToggleCamera(true);
      return;
    }
    if (!!permission?.canAskAgain) {
      const permissionResponse = await requestPermission();
      setToggleCamera(permissionResponse.granted);
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
    setToggleCamera(false);
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

  return (
    <View style={s.container}>
      <View style={s.innerContainer}>
        {!!avatar ? (
          <Image style={s.innerContainer} source={avatar} resizeMode="cover" />
        ) : (
          <Icon
            type="AntDesign"
            name="user"
            color={colors.BLACK_LIGHT}
            size={fonts[70]}
          />
        )}
        <Pressable style={s.buttonOuterContainer} onPress={handleSelectAvatar}>
          <View style={s.buttonInnerContainer}>
            <Icon
              type="Feather"
              name="camera"
              color={colors.WHITE_BOLD}
              size={fonts[20]}
            />
          </View>
        </Pressable>
      </View>
      <Camera
        toggleCamera={toggleCamera}
        setToggleCamera={setToggleCamera}
        savePhoto={
          setAvatar as React.Dispatch<
            React.SetStateAction<CameraCapturedPicture | undefined>
          >
        }
      />
    </View>
  );
};

export default UploadAvatar;
