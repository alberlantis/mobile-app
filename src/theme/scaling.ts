import { PixelRatio, Dimensions } from "react-native";

export interface DimensionSize {
  width: number;
  height: number;
}

export const normalizeSize = (size: number) => {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const baseWidth = 375; // Tamaño base de pantalla
  const scale = SCREEN_WIDTH / baseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
