import { ApplicationMetaData } from "./applicationtypes";
import { MimeTypes } from "./filesystemtypes";

export interface UserDetails {
  userId: string;
  username: string;
  email: string;
}

export interface UserAuthentication {
  password: string;
  pincode?: string;
}

export interface User extends UserDetails, UserAuthentication {
  preferences: Personal;
}

export type Sound = {
  volume: number;
  inputDevice: unknown;
  outputDevice: unknown;
  volumeMixer: unknown;
};

export type Storage = unknown;

export type Bluetooth = unknown;

export type Network = unknown;

export type Personal = {
  background: string;
  colors: unknown;
  themes: unknown;
  lockscreen: unknown;
  startMenu: unknown;
  fonts: unknown;
};

export type Applications = {
  installedApplications: Array<ApplicationMetaData>;
  defaultApplications: { [key in MimeTypes]: string };
  startupApplications: unknown;
};

export type Accounts = { [key in string]: User };

export type OSSettings = {
  sound: Sound;
  storage: Storage;
  bluetooth: Bluetooth;
  network: Network;
  applications: Applications;
  accounts: Accounts;
};
