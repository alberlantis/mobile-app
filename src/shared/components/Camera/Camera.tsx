import React, { useRef, useState } from "react";
import { SafeAreaView, View, Alert, Modal, Image } from "react-native";
import { CameraView, CameraCapturedPicture } from "expo-camera";

import Icon from "../Icon";
import Header from "../Header";
import Button from "../Button";
import { colors, fonts } from "src/theme";
import s from "./Camera.style";

interface ICameraProps {
  savePhoto: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | undefined>
  >;
  setToggleCamera: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCamera: boolean;
}

const Camera: React.FC<ICameraProps> = ({
  toggleCamera,
  setToggleCamera,
  savePhoto,
}) => {
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();
  const cameraRef = useRef<CameraView>(null);
  const handleGoBack = () => {
    if (!photo) {
      setToggleCamera(false);
      return;
    }

    Alert.alert("Unsaved Changes!", "Are you sure you want to continue?", [
      {
        text: "Yes",
        onPress: () => {
          setPhoto(undefined);
          setToggleCamera(false);
        },
      },
      {
        text: "Cancel",
      },
    ]);
  };
  const handleUsePhoto = () => {
    savePhoto(photo);
    setPhoto(undefined);
    setToggleCamera(false);
  };
  const handleCameraPhoto = async () => {
    if (!cameraRef.current) return;
    const data = await cameraRef.current.takePictureAsync();
    if (data instanceof Error) {
      console.error("Something happend when taking photo", data);
      return;
    }
    setPhoto(data);
  };

  return (
    <Modal visible={toggleCamera}>
      <SafeAreaView style={s.container}>
        <View style={s.headerContainer}>
          <Header onPress={handleGoBack} />
        </View>
        <View style={s.content}>
          {!!photo ? (
            <Image
              style={s.imageContainer}
              source={photo}
              resizeMode="contain"
            />
          ) : (
            <CameraView
              style={s.cameraContainer}
              facing="front"
              ref={cameraRef}
            />
          )}
          <View style={s.actionsContainer}>
            <Button
              size="auto"
              paddingVertical={8}
              text={!!photo ? "Use Photo" : "Take Photo"}
              theme="primary"
              onPress={!!photo ? handleUsePhoto : handleCameraPhoto}
            />
            {!!photo && (
              <Icon
                color={colors.WHITE}
                type="MaterialCommunityIcons"
                name="camera-retake-outline"
                style={s.retakeIcon}
                onPress={() => setPhoto(undefined)}
                size={fonts[28]}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Camera;
