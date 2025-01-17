import React, { useRef, useEffect } from "react";
import {
  Modal,
  Animated,
  useWindowDimensions,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
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
  maxHeightScale?: number;
}

const BottomModal: React.FC<IBottomModalProps> = ({
  isVisible,
  title,
  subtitle,
  setModalVisible,
  onClose,
  children,
  maxHeightScale = 0.75,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={s.modalOverlay}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
        <Animated.View
          style={[
            s.modalContent,
            {
              maxHeight: screenHeight * maxHeightScale,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ModalHeader
            closeModal={closeModal}
            subtitle={subtitle}
            title={title}
          />
          {children}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default BottomModal;
