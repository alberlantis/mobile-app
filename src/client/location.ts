import {
  Address,
  Account,
  LocationTag,
  OpeningHours,
  Place,
} from "@satlantis/api-client";

import { EXPO_PUBLIC_CLIENT_ENDPOINT } from "src/shared/constants/env";
import { HTML_METHOD } from "src/client/tools";

export type PlacesMinimal = {
  country_name: string;
  id: number;
  name: string;
};

type GetPlacesByStringArg = {
  name: string;
  page?: number;
  limit?: number;
};

export const getPlacesByString = async (
  { name, page = 1, limit = 20 }: GetPlacesByStringArg,
  signal: AbortSignal,
): Promise<PlacesMinimal[]> => {
  const params = new URLSearchParams({
    filters: JSON.stringify({ name }),
    limit: String(limit),
    page: String(page),
    sortColumn: "name",
    sortDirection: "desc",
  });
  const url = `${EXPO_PUBLIC_CLIENT_ENDPOINT}/getPlacesMinimal?${params.toString()}`;
  const response = await fetch(url, { method: HTML_METHOD.GET, signal });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  try {
    const data = (await response.json()) as PlacesMinimal[];
    return data;
  } catch (e) {
    throw new Error("Error trying to parse get places by string response", e);
  }
};

export type LocationsMinimal = {
  id: number;
  accounts: Account[];
  bio: string | null;
  image: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  locationTags: LocationTag[];
  name: string;
  email: string;
  placeId: number;
  score: number;
  osmRef: string;
  placeOsmRef: string;
  openingHours: OpeningHours;
  address: Address;
  googleRating: number;
  googleUserRatingCount: number;
  place: Place;
  isClaimed: boolean;
  websiteUrl: string;
  phone: string;
};

type GetLocationsByStringArg = {
  search: string;
  page?: number;
  limit?: number;
};

export const getLocationByString = async (
  { search = "", page = 1, limit = 50 }: GetLocationsByStringArg,
  signal: AbortSignal,
) => {
  const params = new URLSearchParams({
    google_rating: "0",
    search,
    page: String(page),
    limit: String(limit),
  });
  const url = `${EXPO_PUBLIC_CLIENT_ENDPOINT}/getLocationsBySearch?${params.toString()}`;
  const response = await fetch(url, { method: HTML_METHOD.GET, signal });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  try {
    const data = (await response.json()) as LocationsMinimal[];
    return data;
  } catch (e) {
    throw new Error(
      "Error trying to parse get locations by string response",
      e,
    );
  }
};

type GetLocationsByPlaceIdArg = {
  placeId: number;
  page?: number;
  limit?: number;
};

export const getLocationByPlaceId = async (
  { placeId, page = 1, limit = 50 }: GetLocationsByPlaceIdArg,
  signal: AbortSignal,
) => {
  const params = new URLSearchParams({
    google_rating: "0",
    page: String(page),
    limit: String(limit),
  });
  const url = `${EXPO_PUBLIC_CLIENT_ENDPOINT}/getLocationsByPlaceID/${placeId}?${params.toString()}`;
  const response = await fetch(url, { method: HTML_METHOD.GET, signal });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  try {
    const data = (await response.json()) as LocationsMinimal[];
    return data;
  } catch (e) {
    throw new Error(
      "Error trying to parse get locations by place id response",
      e,
    );
  }
};
