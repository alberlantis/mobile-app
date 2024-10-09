import React from "react";
import { UserResolver } from "@satlantis/api-client";

import ProfilePortrait from "./ProfilePortrait";
import ProfileInformation from "./ProfileInformation";
import ProfileActions from "./ProfileActions";
import ProfileDetails from "./ProfileDetails";
import ProfileOptions from "./ProfileOptions";

interface IProfileHeaderProps {
  isOwnProfile: boolean;
  profile: UserResolver;
  isAmbassador: boolean;
  pubkey?: string;
  userId?: number; // Detele when id is added on parent userResolver metadata
}

const ProfileHeader: React.FC<IProfileHeaderProps> = ({
  isOwnProfile,
  profile,
  isAmbassador,
  userId = NaN,
  pubkey = "",
}) => {
  return (
    <>
      <ProfilePortrait
        isOwnProfile={isOwnProfile}
        npub={profile.pubkey.bech32()}
        banner={profile.metaData.banner || ""}
      />
      <ProfileInformation
        isOwnProfile={isOwnProfile}
        name={profile.metaData.name || ""}
        totalFollowers={profile.followedBy.length}
        totalFollowings={profile.following.length}
        npub={profile.pubkey.bech32()}
        picture={profile.metaData.picture || ""}
        isAmbassador={isAmbassador}
        email={profile.metaData.email}
      />
      <ProfileActions
        isOwnProfile={isOwnProfile}
        pubkey={pubkey}
        userId={userId}
      />
      <ProfileDetails
        website={profile.metaData.website || ""}
        about={profile.metaData.about || ""}
      />
      <ProfileOptions isBusiness={!!profile.isBusiness} />
    </>
  );
};

export default ProfileHeader;
