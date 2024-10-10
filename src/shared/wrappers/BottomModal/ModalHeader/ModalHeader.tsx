import React from "react";
import { View, Text } from "react-native";

import ExitButton from "src/shared/components/ExitButton";
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
        <ExitButton iconSize={18} onPress={closeModal} size={38} />
      </View>
    </View>
  );
};

export default ModalHeader;
