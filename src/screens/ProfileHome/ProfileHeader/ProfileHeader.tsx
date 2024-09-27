import React from "react";

import ProfilePortrait from "../ProfilePortrait";
import ProfileInformation from "../ProfileInformation";
import ProfileActions from "../ProfileActions";
import ProfileDetails from "../ProfileDetails";
import ProfileOptions from "../ProfileOptions";

const ProfileHeader: React.FC = () => {
  return (
    <>
      <ProfilePortrait />
      <ProfileInformation />
      <ProfileActions />
      <ProfileDetails />
      <ProfileOptions />
    </>
  );
};

export default ProfileHeader;
