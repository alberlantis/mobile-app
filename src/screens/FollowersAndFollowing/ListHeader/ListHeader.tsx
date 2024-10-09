import React from "react";
import { View } from "react-native";

import { Header, Button } from "src/shared/components";
import { colors } from "src/theme";
import s from "./ListHeader.style";

interface IListHeaderProps {
  setShowFollowers: React.Dispatch<React.SetStateAction<boolean>>;
  showFollowers: boolean;
  name: string;
  totalFollowers: number;
  totalFollowings: number;
}
const ListHeader: React.FC<IListHeaderProps> = ({
  showFollowers,
  totalFollowers,
  totalFollowings,
  name,
  setShowFollowers,
}) => {
  return (
    <View>
      <View style={s.headerContainer}>
        <Header title={name} backButtonColor={colors.GRAY_BOLD} />
      </View>
      <View style={s.buttonsContainer}>
        <View style={s.followersButtonContainer}>
          <Button
            size="fill"
            text={`Followers ${totalFollowers}`}
            theme={showFollowers ? "primary" : "off"}
            paddingVertical={9}
            onPress={() => setShowFollowers(true)}
          />
        </View>
        <View style={s.followingButtonContainer}>
          <Button
            size="fill"
            text={`Following ${totalFollowings}`}
            theme={showFollowers ? "off" : "primary"}
            paddingVertical={9}
            onPress={() => setShowFollowers(false)}
          />
        </View>
      </View>
    </View>
  );
};

export default ListHeader;
