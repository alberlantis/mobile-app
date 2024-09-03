import React, { Fragment } from "react";

import { Separator } from "src/shared/components";
import ProfilePortrait from "../ProfilePortrait";
import ProfileInformation from "../ProfileInformation";
import ProfileActions from "../ProfileActions";
import ProfileDetails from "../ProfileDetails";
import ProfileOptions from "../ProfileOptions";

const ProfileHeader = () => {
  return (
    <Fragment>
      <ProfilePortrait />
      <ProfileInformation />
      <Separator span={2} />
      <ProfileActions />
      <Separator span={2} />
      <ProfileDetails />
      <Separator span={2} />
      <ProfileOptions />
      <Separator span={2} />
    </Fragment>
  );
};

export default ProfileHeader;