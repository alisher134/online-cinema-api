export interface AuthJwtPayload {
  id: string;
}

export interface SocialUserProfile {
  email: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  accessToken: string;
  refreshToken: string;
}

type GoogleName = {
  familyName: string;
  givenName: string;
};

type GoogleEmails = {
  value: string;
};

type GooglePhotos = {
  value: string;
};

export interface GoogleProfile {
  id: string;
  name: GoogleName;
  emails: GoogleEmails[];
  photos: GooglePhotos[];
  provider: 'google';
  accessToken: string;
}
