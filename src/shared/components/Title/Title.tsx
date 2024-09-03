import React from "react";
import { Text } from "react-native";

import s from "./Title.style";

interface ITitleProps {
  title: string;
}

const Title: React.FC<ITitleProps> = ({ title }) => {
  return <Text style={s.title}>{title}</Text>;
};

export default Title;
