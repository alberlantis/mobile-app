import React from "react";
import { View, Text } from "react-native";

import comments from "mock/profile/mockCommentsList.json";
import Icon from "../Icon";
import { useImageAssets } from "src/shared/hooks";
import RoundImage from "../RoundImage";
import { colors, normalizeSize } from "src/theme";
import s from "./CommentCard.style";
import { timeSince } from "src/utils";

export type CommentItem = (typeof comments)[0];
interface ICommentCardProps {
  pictureSize: number;
  item: CommentItem;
}
const CommentCard: React.FC<ICommentCardProps> = ({ item, pictureSize }) => {
  const { images } = useImageAssets();
  return (
    <View style={s.container}>
      <View style={s.innerContainer}>
        <RoundImage image={images.mockUserAvatar} size={pictureSize} />
        <View style={s.informationContainer}>
          <View style={s.nameContainer}>
            <Text style={s.name}>{item.name}</Text>
            <Text style={s.createAt}>{timeSince(item.createdAt)}</Text>
          </View>
          <Text style={s.comment}>{item.comment}</Text>
          <View style={s.replyButton}>
            <Icon
              type="FontAwesome6"
              name="comments"
              size={normalizeSize(12)}
              color={colors.GRAY_3}
            />
            <Text style={s.reply}>Reply</Text>
          </View>
          {!!item.replies.length &&
            item.replies.map((reply, index) => (
              <View
                key={`reply-of-${item.id}-${reply.id}-${index}`}
                style={s.replyContainer}
              >
                <CommentCard item={reply} pictureSize={18} />
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
