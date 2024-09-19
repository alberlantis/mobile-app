import React, { useState } from "react";
import { View } from "react-native";

import comments from "mock/profile/mockCommentsList.json";
import { colors, normalizeSize } from "src/theme";
import Icon from "../../../Icon";
import CommentList from "../../../CommentList";
import Input from "../../../Input";
import { BottomModal } from "src/shared/wrappers";
import s from "./CommentsModal.style";

interface ICommentsModalProps {
  isVisible: boolean;
  setModalVisible(value: boolean): void;
}

const CommentsModal: React.FC<ICommentsModalProps> = ({
  isVisible,
  setModalVisible,
}) => {
  const [comment, setComment] = useState("");

  return (
    <BottomModal
      isVisible={isVisible}
      setModalVisible={setModalVisible}
      title="Comments"
      subtitle="64 Comments"
    >
      <View style={s.modalContentContainer}>
        <CommentList
          keyExtractor={(item, index) =>
            `view-post-comments-list-${item.id}-${index}`
          }
          data={comments}
          style={s.modalListContainer}
        />
        <View style={s.commentBoxContainer}>
          <Input
            value={comment}
            onChangeText={setComment}
            backColor={colors.BLACK_DARK}
            placeholder="Add a comment"
            paddingVertical={7}
            multiline
            icon={
              <View style={s.sendIcon}>
                <Icon
                  type="Feather"
                  name="send"
                  size={normalizeSize(16)}
                  color={colors.WHITE}
                />
              </View>
            }
          />
        </View>
      </View>
    </BottomModal>
  );
};

export default CommentsModal;
