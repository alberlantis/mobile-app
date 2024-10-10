import React, { memo, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import type { PlacesMinimal } from "src/client/location";
import { SCREENS } from "src/navigation/routes";
import type { SignedNavigationProps } from "src/navigation/SignedStack";
import type { LocationListTitles, LocationTabData } from "../hooks";
import { RoundImage, Icon } from "src/shared/components";
import s from "./LocationCard.style";
import { colors, normalizeSize } from "src/theme";

const getCardFooterText = (
  country: string | undefined,
  openingHours: string | undefined,
) => {
  if (!!country) return country;
  if (!!openingHours) return `Today: ${openingHours}`;
  return "";
};

interface ILocationCardProps {
  locationInfo: LocationTabData;
  setValueSearch(value: string): void;
  setPlaceSelected(value: PlacesMinimal): void;
  section: LocationListTitles;
}
const LocationCard: React.FC<ILocationCardProps> = ({
  locationInfo,
  section,
  setValueSearch,
  setPlaceSelected,
}) => {
  const navigation =
    useNavigation<SignedNavigationProps<typeof SCREENS.LOCATION>>();
  const isLocation = useMemo(() => section === "Merchants", [section]);
  const cardFooter = getCardFooterText(
    locationInfo.country,
    locationInfo.openingHours,
  );
  return (
    <Pressable
      style={s.container}
      onPress={() => {
        if (section === "Locations") {
          setValueSearch(`${locationInfo.name}, ${locationInfo.country}`);
          setPlaceSelected({
            id: locationInfo.id,
            country_name: locationInfo.country || "",
            name: locationInfo.name,
          });
          return;
        }
        navigation.navigate(SCREENS.LOCATION_DETAILS, {
          location: locationInfo,
        });
      }}
    >
      <View style={s.innerContainer}>
        {!!locationInfo.image ? (
          <RoundImage image={locationInfo.image} size={48} />
        ) : (
          <View style={s.emptyImageContainer}>
            <Icon
              name={isLocation ? "storefront" : "location-pin"}
              type={isLocation ? "MaterialIcons" : "SimpleLineIcons"}
              color={colors.GRAY_3}
              size={normalizeSize(20)}
            />
          </View>
        )}
        <View style={s.informationContainer}>
          <View style={s.nameContainer}>
            <Text style={s.name}>{locationInfo.name}</Text>
          </View>
          {!!locationInfo.categories?.length && (
            <Text>
              {locationInfo.categories.map((category, index, arr) => (
                <Text style={s.job} numberOfLines={1}>
                  {index !== arr.length - 1 ? `${category}, ` : category}
                </Text>
              ))}
            </Text>
          )}
          {!!cardFooter && <Text style={s.description}>{cardFooter}</Text>}
        </View>
      </View>
      {!!locationInfo.raiting && (
        <View style={s.raitingsContainer}>
          <Text style={s.raitingsText}>{locationInfo.raiting}</Text>
          <Icon
            type="AntDesign"
            name="star"
            color={colors.GRAY}
            size={normalizeSize(8)}
          />
        </View>
      )}
    </Pressable>
  );
};

export default memo(
  LocationCard,
  (prevProps, nextProps) =>
    prevProps.locationInfo.id === nextProps.locationInfo.id,
);
