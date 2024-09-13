import React from "react";
import { Image, ImageSourcePropType } from "react-native";

import { normalizeSize } from "src/theme";

interface IRoundImageProps {
  size: number;
  image: ImageSourcePropType | string | undefined;
}

const getSanitizeImage = (image: ImageSourcePropType | string) =>
  typeof image === "string" ? { uri: image } : image;

const RoundImage: React.FC<IRoundImageProps> = ({ size, image }) => {
  return !!image ? (
    <Image
      resizeMode="cover"
      source={getSanitizeImage(image)}
      style={{
        width: normalizeSize(size),
        height: normalizeSize(size),
        borderRadius: normalizeSize(size) / 2,
      }}
    />
  ) : null;
};

export default RoundImage;
