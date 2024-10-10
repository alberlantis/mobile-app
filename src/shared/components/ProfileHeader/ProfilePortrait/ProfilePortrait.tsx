import React from "react";
import { View } from "react-native";
import * as Clipboard from "expo-clipboard";

import { useAppSelector, NostrState } from "src/store";
import { colors } from "src/theme";
import Header from "src/shared/components/Header";
import ImagePortrait from "src/shared/components/ImagePortrait";
import { useImageAssets } from "src/shared/hooks";
import { EXPO_PUBLIC_DOMAIN } from "src/shared/constants/env";
import type { ActionMenuOptions } from "src/shared/components/ActionMenu";
import s from "./ProfilePortrait.style";

interface IProfilePortraitProps {
  isOwnProfile: boolean;
  banner: string;
  npub: string;
}

const ProfilePortrait: React.FC<IProfilePortraitProps> = ({
  isOwnProfile,
  npub,
  banner,
}) => {
  const { images } = useImageAssets();
  const nsec = useAppSelector(NostrState.selectors.selectPrivateKey);
  const actionMenuOptions: ActionMenuOptions[] = [
    {
      text: "Copy user npub",
      onPress: async () => {
        if (!npub) return;
        await Clipboard.setStringAsync(npub);
      },
      icon: {
        type: "FontAwesome6",
        name: "users-rectangle",
      },
    },
    {
      text: "Copy user nsec",
      onPress: async () => {
        if (!nsec) return;
        await Clipboard.setStringAsync(nsec);
      },
      icon: {
        type: "FontAwesome6",
        name: "user",
      },
    },
  ];

  return (
    <View>
      <View style={s.topHeaderContainer}>
        <Header
          hideBackButton={isOwnProfile}
          backButtonColor={colors.BLACK_MEDIUM}
          showSharedButton
          shareValue={`${EXPO_PUBLIC_DOMAIN}/p/${npub}`}
          showActionMenuButton
          actionMenuOptions={actionMenuOptions}
        />
      </View>
      <ImagePortrait
        defaultBanner={images.logo}
        imageBanner={{ uri: banner }}
      />
    </View>
  );
};

export default ProfilePortrait;
