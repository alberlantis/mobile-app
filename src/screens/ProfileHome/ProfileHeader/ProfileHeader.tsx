import React from "react";

import { Separator } from "src/shared/components";
import ProfilePortrait from "../ProfilePortrait";
import ProfileInformation from "../ProfileInformation";
import ProfileActions from "../ProfileActions";
import ProfileDetails from "../ProfileDetails";
import ProfileOptions from "../ProfileOptions";

const ProfileHeader = () => {
  return (
    <>
      <ProfilePortrait />
      <ProfileInformation />
      <Separator span={2} marginBottom="2%" marginTop="2%" />
      <ProfileActions />
      <ProfileDetails />
      <Separator span={2} marginBottom="2%" marginTop="2%" />
      <ProfileOptions />
    </>
  );
};

export default ProfileHeader;
