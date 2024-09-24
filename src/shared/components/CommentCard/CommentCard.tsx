import React from "react";
import { View, Text, Pressable } from "react-native";
import type { Note } from "@satlantis/api-client";

import Icon from "../Icon";
import RoundImage from "../RoundImage";
import { colors, normalizeSize } from "src/theme";
import s from "./CommentCard.style";
import { timeSince } from "src/utils";

const renderFormattedText = (value: string) => {
  const parts = value.split(/(@\S*)/g);
  return parts.map((part, index) => {
    return (
      <Text
        key={index}
        style={{
          color: part.startsWith("@")
            ? colors.ORANGE_PRIMARY_LIGHT
            : colors.WHITE,
        }}
      >
        {part}
      </Text>
    );
  });
};

interface ICommentCardProps {
  pictureSize: number;
  item: Note;
}
const CommentCard: React.FC<ICommentCardProps> = ({ item, pictureSize }) => {
  const handleReply = () => {
    // todo: questions for albert (Replies to comments, are this implemented on the back?)
  };

  return (
    <View style={s.container}>
      <View style={s.innerContainer}>
        <RoundImage image={item.account.picture} size={pictureSize} />
        <View style={s.informationContainer}>
          <View style={s.nameContainer}>
            <Text style={s.name}>{item.account.name}</Text>
            <Text style={s.createAt}>{timeSince(item.createdAt)}</Text>
          </View>
          <Text style={s.comment}>{renderFormattedText(item.content)}</Text>
          <Pressable onPress={handleReply} style={s.replyButton}>
            <Icon
              type="FontAwesome6"
              name="comments"
              size={normalizeSize(12)}
              color={colors.GRAY_3}
            />
            <Text style={s.reply}>Reply</Text>
          </Pressable>
          {!!item.descendants?.length &&
            item.descendants.map((reply, index) => (
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
