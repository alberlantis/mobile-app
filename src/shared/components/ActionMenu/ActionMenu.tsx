import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  ColorValue,
  Dimensions,
} from "react-native";

import { colors, normalizeSize } from "src/theme";
import Icon, { IconName, IconType } from "../Icon";
import s from "./ActionMenu.style";
import MenuItem from "./MenuItem";

export type ActionMenuOptions = {
  icon: {
    type: IconType;
    name: IconName;
  };
  text: string;
  onPress(): void;
  primary?: boolean;
};

interface IActionMenuProps {
  buttonColorClose?: ColorValue;
  buttonColorOpen?: ColorValue;
  size?: number;
  options: ActionMenuOptions[];
  screen: string;
}

const ActionMenu: React.FC<IActionMenuProps> = ({
  buttonColorClose = colors.WHITE,
  buttonColorOpen = colors.ORANGE_PRIMARY_DARK,
  size = 16,
  options = [],
  screen,
}) => {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const dotsButtonRef = useRef<TouchableOpacity>(null);

  const toggleMenu = () => {
    if (!isMenuVisible) {
      dotsButtonRef.current?.measure((...[, , width, height, px, py]) => {
        setMenuPosition({
          top: py + height + normalizeSize(10),
          left: -(Dimensions.get("window").width - (px + width)),
        });
        setIsMenuVisible(true);
      });
    } else {
      setIsMenuVisible(false);
    }
  };

  const handleMenuItemPress = (callback: () => void) => {
    if (!!callback) callback();
    setIsMenuVisible(false);
  };

  return (
    <View>
      <TouchableOpacity ref={dotsButtonRef} onPress={toggleMenu}>
        <Icon
          type="Entypo"
          name="dots-three-horizontal"
          size={normalizeSize(size)}
          color={isMenuVisible ? buttonColorOpen : buttonColorClose}
        />
      </TouchableOpacity>

      {isMenuVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isMenuVisible}
          onRequestClose={toggleMenu}
        >
          <TouchableOpacity
            style={s.overlay}
            activeOpacity={1}
            onPressOut={toggleMenu}
          >
            <View
              style={[
                s.menu,
                { top: menuPosition.top, left: menuPosition.left },
              ]}
            >
              <View style={s.menuItemContainer}>
                {options.map((option, index) => (
                  <MenuItem
                    key={`action-menu-${screen}-${option}-${index}`}
                    type={option.icon.type}
                    icon={option.icon.name}
                    text={option.text}
                    onPress={() => handleMenuItemPress(option.onPress)}
                    first={index === 0}
                    last={index === options.length - 1}
                    primary={option.primary}
                  />
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default ActionMenu;
