import { normalizeSize } from "./scaling";

type FontWeight = 400 | 500 | 600 | 700;
export type FontSize = 10 | 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 70;

export default {
  regular: 400 as FontWeight,
  medium: 500 as FontWeight,
  semiBold: 600 as FontWeight,
  bold: 700 as FontWeight,
  10: normalizeSize(10),
  12: normalizeSize(12),
  14: normalizeSize(14),
  16: normalizeSize(16),
  18: normalizeSize(18),
  20: normalizeSize(20),
  22: normalizeSize(22),
  24: normalizeSize(24),
  26: normalizeSize(26),
  28: normalizeSize(28),
  70: normalizeSize(70),
};
