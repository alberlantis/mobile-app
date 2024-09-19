import React from "react";
import { View } from "react-native";

import followers from "mock/profile/mockFollowers.json";
import FollowList from "src/shared/components/FollowList";
import BottomModal from "src/shared/wrappers/BottomModal";
import s from "./LikesModal.style";

interface ILikesModalProps {
  isVisible: boolean;
  setModalVisible(value: boolean): void;
}

const LikesModal: React.FC<ILikesModalProps> = ({
  isVisible,
  setModalVisible,
}) => {
  return (
    <BottomModal
      isVisible={isVisible}
      setModalVisible={setModalVisible}
      title="Likes"
      subtitle="200 Likes"
    >
      <View style={s.modalContentContainer}>
        <FollowList
          keyExtractor={(item, index) =>
            `view-post-likes-list-${item.id}-${index}`
          }
          data={followers as any}
          style={s.modalListContainer}
        />
      </View>
    </BottomModal>
  );
};

export default LikesModal;