import React from "react";
import { View, Text, Pressable } from "react-native";

import { colors, fonts } from "src/theme";
import { Icon } from "src/shared/components";
import s from "./ModalHeader.style";

interface IModalHeaderProps {
  closeModal(): void;
  title: string;
  subtitle?: string;
}

const ModalHeader: React.FC<IModalHeaderProps> = ({
  title,
  subtitle,
  closeModal,
}) => {
  return (
    <View style={s.modalHeader}>
      <View style={s.modalHeaderLeft} />
      <View style={s.modalHeaderTitle}>
        <Text style={s.modalTitle}>{title}</Text>
        {subtitle && <Text style={s.modalSubtitle}>{subtitle}</Text>}
      </View>
      <View style={s.modalHeaderRight}>
        <Pressable onPress={closeModal} style={s.modalHeaderCloseButton}>
          <Icon
            type="AntDesign"
            name="close"
            size={fonts[18]}
            color={colors.WHITE}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ModalHeader;
