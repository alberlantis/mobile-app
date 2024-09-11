import React, { useRef, useEffect } from "react";
import {
  Modal,
  Animated,
  useWindowDimensions,
  View,
  Pressable,
  StyleSheet,
} from "react-native";

import s from "./BottomModal.style";
import ModalHeader from "./ModalHeader";

interface IBottomModalProps {
  isVisible: boolean;
  setModalVisible(value: boolean): void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose?(): void;
}

const BottomModal: React.FC<IBottomModalProps> = ({
  isVisible,
  title,
  subtitle,
  setModalVisible,
  onClose,
  children,
}) => {
  const { height: screenHeight } = useWindowDimensions();
  const { current: slideAnim } = useRef(new Animated.Value(screenHeight));

  useEffect(() => {
    if (!isVisible) return;
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, slideAnim]);

  const closeModal = () => {
    if (!!onClose) onClose();
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
    >
      <View style={s.modalOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
        <Animated.View
          style={[s.modalContent, { transform: [{ translateY: slideAnim }] }]}
        >
          <ModalHeader
            closeModal={closeModal}
            subtitle={subtitle}
            title={title}
          />
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomModal;
