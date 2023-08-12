export type Mkdir = {
  directoryPath: string;
  name: string;
};

export type Directory = {
  filePath: string;
  isDir: boolean;
};

export type Path = string;

export enum MimeTypes {
  txt = "txt",
  thijm = "thijm",
  dir = "dir",
}

export enum Access {
  r = "r",
  w = "w",
  x = "x",
}

export const accessObjectError = "####";

export interface AccessObject {
  path: string;
  userId: string;
  userAccess: AccessMap;
  groupId: string;
  groupAccess: AccessMap;
}

export type AccessObjectMap = { [key in string]: AccessObject };
export type AccessMap = { [key in Access]: boolean };
