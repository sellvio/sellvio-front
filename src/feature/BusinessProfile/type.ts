import { Dispatch, SetStateAction } from 'react';

export type BusinessProfilePictureProps = {
  changeProfile: boolean;
  setChangeProfile: Dispatch<SetStateAction<boolean>>;
};
