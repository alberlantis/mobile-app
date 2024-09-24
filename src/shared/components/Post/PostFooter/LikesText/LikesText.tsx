import React from "react";
import { Reaction } from "@satlantis/api-client";
import { Text, View } from "react-native";

import RoundImage from "src/shared/components/RoundImage";
import s from "./LikesText.style";

interface ILikesTextProps {
  reactions: Reaction[];
  totalLikes: number;
}

const LikesText: React.FC<ILikesTextProps> = ({ reactions, totalLikes }) => {
  if (!reactions.length) return null;
  const othersLike = totalLikes - 1;

  return (
    <View style={s.postFollowersLikeContainer}>
      <RoundImage image={""} size={18} />
      <Text style={s.postFollowersLikesText}>
        Liked by <Text style={s.lastFollowerName}>Jefferson</Text>{" "}
        {!!othersLike && `and ${othersLike.toString()} others you know`}
      </Text>
    </View>
  );
};

export default LikesText;
