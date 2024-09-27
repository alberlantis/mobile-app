import React from "react";
import { Image, ImageSourcePropType } from "react-native";

import { useImageAssets } from "src/shared/hooks";
import { normalizeSize } from "src/theme";

interface IRoundImageProps {
  size: number;
  image: ImageSourcePropType | string | undefined;
}

const getSanitizeImage = (image: ImageSourcePropType | string) =>
  typeof image === "string" ? { uri: image } : image;

const RoundImage: React.FC<IRoundImageProps> = ({ size, image }) => {
  const { images } = useImageAssets();
  return (
    <Image
      width={normalizeSize(size)}
      height={normalizeSize(size)}
      resizeMode="cover"
      resizeMethod="scale"
      source={getSanitizeImage(image || images.logo)}
      style={{
        width: normalizeSize(size),
        height: normalizeSize(size),
        borderRadius: normalizeSize(size) / 2,
      }}
    />
  );
};

export default RoundImage;
