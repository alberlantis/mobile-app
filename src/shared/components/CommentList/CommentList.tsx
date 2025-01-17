import React from "react";
import { FlatList, StyleProp, ViewStyle, View } from "react-native";
import type { Note } from "@satlantis/api-client";

import CommentCard from "../CommentCard";
import s from "./CommentList.style";

interface ICommentListProps {
  listHeader?(): React.JSX.Element;
  style?: StyleProp<ViewStyle>;
  data: Note[];
  keyExtractor(item: Note, index: number): string;
}

const CommentList: React.FC<ICommentListProps> = ({
  listHeader,
  keyExtractor,
  style = s.container,
  data,
}) => {
  return (
    <FlatList
      style={style}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={({ item }) => (
        <View style={s.itemContainer}>
          <CommentCard item={item} pictureSize={18} />
        </View>
      )}
      ListHeaderComponent={listHeader}
    />
  );
};

export default CommentList;
