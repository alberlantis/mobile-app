import React from "react";
import { View, Image, Text, Linking } from "react-native";

import { colors } from "src/theme";
import { useImageAssets } from "src/shared/hooks";
import { InteractiveText } from "src/shared/components";
import s from "./EmptyList.style";

const EmptyList = () => {
  const { images } = useImageAssets();
  const email = "support@satlantis.io";

  const openEmailApp = async () => {
    try {
      await Linking.openURL(`mailto:${email}`);
    } catch (e) {
      new Error("Error al intentar abrir la URL:", e);
    }
  };

  return (
    <View style={s.container}>
      <Image source={images.noLocationsFound} style={s.image} />
      <Text style={s.subtitle}>No Merchants found</Text>
      <Text style={s.textContainer}>
        <InteractiveText
          prefix="Tell your favorite merchant to add themselves to satlantis by contacting"
          text={email}
          color={colors.ORANGE_SEND_BUTTON}
          onPress={openEmailApp}
        />
      </Text>
    </View>
  );
};

export default EmptyList;
