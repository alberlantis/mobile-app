import { Address, OpeningHours, LocationTag } from "@satlantis/api-client";
import { useMemo } from "react";

import type { PlacesMinimal, LocationsMinimal } from "src/client/location";
import { getDay } from "src/utils";

export type LocationListTitles = "Locations" | "Merchants";

export type LocationTabData = {
  id: number;
  name: string;
  country?: string;
  image?: string;
  openingHours?: string;
  categories?: string[];
  raiting?: number;
  banner?: string;
  lat?: number;
  lng?: number;
  isClaimed?: boolean;
  address?: Address;
  openingHoursTable?: OpeningHours;
  bio?: string;
  website?: string;
  email?: string;
  phone?: string;
  tags?: LocationTag[];
  googleMapsUrl?: string;
};

export type LocationList = {
  title: LocationListTitles;
  data: LocationTabData[];
};

const useTransformDataSection = (
  places: PlacesMinimal[],
  locations: LocationsMinimal[],
) => {
  const listData = useMemo(
    (): LocationList[] => [
      {
        title: "Locations",
        data: places.map((place) => ({
          id: place.id,
          name: place.name,
          country: place.country_name,
        })),
      },
      {
        title: "Merchants",
        data: locations.map((location) => ({
          id: location.id,
          name: location.name,
          image: location.image,
          openingHours: location.openingHours[getDay()],
          categories: location.locationTags.map((tag) => tag.category),
          raiting: location.googleRating,
          banner: location.place?.banner,
          lat: location.lat,
          lng: location.lng,
          googleMapsUrl: location.googleMapsUrl,
          isClaimed: location.isClaimed,
          address: location.address,
          openingHoursTable: location.openingHours,
          bio: location.bio || "",
          website: location.websiteUrl,
          phone: location.phone,
          email: location.email,
          tags: location.locationTags,
        })),
      },
    ],
    [places, locations],
  );

  return { listData };
};

export default useTransformDataSection;
