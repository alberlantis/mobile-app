import { StyleSheet } from "react-native";

import { normalizeSize, colors, fonts } from "src/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
  },
  topHeaderContainer: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    paddingHorizontal: normalizeSize(17),
  },
  titleButtonContainer: {
    padding: normalizeSize(16),
  },
  title: {
    color: colors.WHITE,
    fontSize: fonts[16],
    fontWeight: fonts.semiBold,
    marginBottom: normalizeSize(32),
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  locationDirection: {
    color: colors.WHITE,
    fontSize: fonts[14],
    fontWeight: fonts.medium,
  },
  locationCity: {
    color: colors.WHITE_BOLD,
    fontSize: fonts[12],
    fontWeight: fonts.regular,
  },
  directionContainer: {
    flexDirection: "row",
  },
  claimAndDirectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: normalizeSize(12),
    paddingHorizontal: normalizeSize(16),
    borderBottomWidth: normalizeSize(1),
    borderBottomColor: colors.GRAY,
  },
  locationHoursContainer: {
    flexDirection: "row",
  },
  clockIconContainer: {
    width: normalizeSize(48),
    height: normalizeSize(48),
    backgroundColor: colors.GRAY_BOLD,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: normalizeSize(8),
    marginRight: normalizeSize(12),
  },
  locationHoursAndClockIconContainer: {
    flexDirection: "row",
    padding: normalizeSize(16),
    borderBottomWidth: normalizeSize(1),
    borderBottomColor: colors.GRAY,
  },
  locationDescriptionContainer: {
    paddingVertical: normalizeSize(12),
    paddingHorizontal: normalizeSize(16),
    borderBottomWidth: normalizeSize(1),
    borderBottomColor: colors.GRAY,
  },
  locationDescription: {
    fontSize: fonts[14],
    fontWeight: fonts.medium,
    color: colors.WHITE,
  },
  locationWebsite: {
    fontSize: fonts[14],
    fontWeight: fonts.medium,
    color: colors.ORANGE_PRIMARY_LIGHT,
    marginBottom: normalizeSize(8),
  },
  locationEmail: {
    fontSize: fonts[14],
    fontWeight: fonts.medium,
    color: colors.WHITE_BOLD,
    marginBottom: normalizeSize(4),
  },
  locationPhone: {
    fontSize: fonts[14],
    fontWeight: fonts.medium,
    color: colors.ORANGE_PRIMARY_LIGHT,
  },
  tagName: {
    color: colors.WHITE,
    fontSize: fonts[12],
    fontWeight: fonts.medium,
    marginLeft: normalizeSize(8),
  },
  tagContainer: {
    flexDirection: "row",
    backgroundColor: colors.GRAY_BOLD,
    paddingVertical: normalizeSize(12),
    paddingHorizontal: normalizeSize(16),
    marginRight: normalizeSize(12),
    marginBottom: normalizeSize(12),
    borderRadius: normalizeSize(16),
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: normalizeSize(16),
    paddingTop: normalizeSize(12),
    borderBottomWidth: normalizeSize(1),
    borderBottomColor: colors.GRAY,
  },
  otherTagContainer: {
    flexDirection: "row",
    backgroundColor: colors.GRAY_BOLD,
    paddingVertical: normalizeSize(4),
    paddingHorizontal: normalizeSize(16),
    borderRadius: normalizeSize(16),
    marginRight: normalizeSize(12),
    marginBottom: normalizeSize(12),
  },
  otherTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: normalizeSize(16),
    paddingTop: normalizeSize(16),
  },
  otherTagName: {
    color: colors.WHITE,
    fontSize: fonts[12],
    fontWeight: fonts.medium,
  },
  mapButtonContainer: {
    width: "100%",
    height: normalizeSize(100),
  },
  mapContainer: {
    width: "100%",
    height: "100%",
  },
});
