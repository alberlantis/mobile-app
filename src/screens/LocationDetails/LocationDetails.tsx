import React from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  Linking,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import type { SignedScreenProps } from "src/navigation/SignedStack";
import { SCREENS } from "src/navigation/routes";
import { colors, fonts, normalizeSize } from "src/theme";
import { ImagePortrait, Header, Button, Icon } from "src/shared/components";
import { useImageAssets } from "src/shared/hooks";
import s from "./LocationDetails.style";
import { isDay, capitalizeWords } from "src/utils";
import { getCategoryIcon } from "src/screens/Location/hooks/useCategories";
import { IconType } from "src/shared/components/Icon";

const LocationDetails: React.FC<
  SignedScreenProps<typeof SCREENS.LOCATION_DETAILS>
> = ({ route }) => {
  const { location } = route.params;
  const { images } = useImageAssets();

  const openNavigationApp = () => {
    let url = "";
    if (!!location.googleMapsUrl) {
      url = location.googleMapsUrl;
    } else {
      url = Platform.select({
        ios: `http://maps.apple.com/?daddr=${location.lat},${location.lng}`,
        android: `google.navigation:q=${location.lat},${location.lng}`,
        default: "",
      });
    }

    Linking.openURL(url || "").catch((err) => {
      throw new Error("Error opening maps", err);
    });
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.topHeaderContainer}>
        <Header
          backButtonColor={colors.BLACK_MEDIUM}
          showSharedButton
          shareValue={""}
        />
      </View>
      <ImagePortrait
        defaultBanner={images.cityDefault}
        imageBanner={{ uri: location.banner || undefined }}
      />
      <View style={s.titleButtonContainer}>
        <Text style={s.title}>{location.name}</Text>
        <View style={s.buttonsContainer}>
          <Button
            text="Info"
            theme="primary"
            size="auto"
            paddingVertical={5.5}
            marginRight={normalizeSize(12)}
            onPress={() => {}}
          />
        </View>
      </View>
      <Pressable style={s.mapButtonContainer} onPress={openNavigationApp}>
        <MapView
          style={s.mapContainer}
          initialRegion={{
            latitude: location.lat || NaN,
            longitude: location.lng || NaN,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.lat || NaN,
              longitude: location.lng || NaN,
            }}
          />
        </MapView>
      </Pressable>
      <View style={s.claimAndDirectionContainer}>
        <View style={s.directionContainer}>
          <Icon
            name="location-pin"
            type="SimpleLineIcons"
            color={colors.GRAY_3}
            size={normalizeSize(16)}
            style={{
              marginRight: normalizeSize(4),
            }}
          />
          <View>
            <Text
              style={s.locationDirection}
            >{`${location.address?.streetNumber} ${location.address?.route}`}</Text>
            <Text
              style={s.locationCity}
            >{`${location.address?.locality}, ${location.address?.country}`}</Text>
          </View>
        </View>
        {!location.isClaimed && (
          <Button onPress={() => {}} text="Claim" theme="green" size="auto" />
        )}
      </View>
      <View style={s.locationHoursAndClockIconContainer}>
        <View style={s.clockIconContainer}>
          <Icon type="Feather" name="clock" color={colors.WHITE_BOLD} />
        </View>
        <View>
          {!!location.openingHoursTable &&
            Object.entries(location.openingHoursTable).map(
              ([day, hour], index, arr) => (
                <View
                  key={`location-details-open-hours-${index}`}
                  style={[
                    s.locationHoursContainer,
                    {
                      marginBottom:
                        index === arr.length - 1 ? 0 : normalizeSize(8),
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: isDay(day) ? colors.WHITE : colors.WHITE_BOLD,
                      fontSize: fonts[14],
                      width: "35%",
                    }}
                  >
                    {capitalizeWords(day)}:
                  </Text>
                  <Text
                    style={{
                      fontSize: fonts[14],
                      color: isDay(day) ? colors.WHITE : colors.WHITE_BOLD,
                    }}
                  >
                    {hour}
                  </Text>
                </View>
              ),
            )}
        </View>
      </View>
      <View style={s.locationDescriptionContainer}>
        {location.bio && (
          <Text style={s.locationDescription}>{location.bio}</Text>
        )}
        {location.website && (
          <Text style={s.locationWebsite}>{location.website}</Text>
        )}
        {location.email && (
          <Text style={s.locationEmail}>{location.email}</Text>
        )}
        {location.phone && (
          <Text style={s.locationPhone}>{location.phone}</Text>
        )}
      </View>
      <View style={s.tagsContainer}>
        {!!location.tags &&
          location.tags.map((tag, index) => {
            const icon = getCategoryIcon(tag.category);
            return (
              <View key={`topic-tags-${tag}-${index}`} style={s.tagContainer}>
                <Icon
                  name={icon.name}
                  type={icon.type as IconType}
                  color={colors.FLAME}
                  size={normalizeSize(16)}
                />
                <Text style={s.tagName}>{capitalizeWords(tag.value)}</Text>
              </View>
            );
          })}
      </View>
      {/* <View style={s.otherTagsContainer}>
        {OTHER_TAGS.map((tag, index) => {
          return (
            <View
              key={`other-tags-${tag}-${index}`}
              style={s.otherTagContainer}
            >
              <Text style={s.otherTagName}>{tag}</Text>
            </View>
          );
        })}
      </View> */}
    </ScrollView>
  );
};

export default LocationDetails;
