import { Permissions } from "../settings";
import { MimeTypes } from "./filesystemtypes";

export type Event<T> = { eventName: string; eventSender: string; eventData: T };

export enum ApplicationMetaDataFields {
  applicationIdentifier = "applicationIdentifier",
  title = "title",
  iconLocation = "iconLocation",
  exeLocation = "exeLocation",
  mimeTypes = "mimeTypes",
  permissions = "permissions",
}

export interface IconMetadataShape {
  name: string;
  iconLocation?: string;
  exeLocation: string;
  mimeType: MimeTypes;
}

export interface ApplicationMetaDataShape extends IconMetadataShape {
  applicationIdentifier: string;
  name: string;
  iconLocation: string;
  exeLocation: string;
  mimeTypes: Array<MimeTypes>;
  permissions: Array<Permissions>;
  singleton?: boolean;
}

export class ApplicationMetaData implements ApplicationMetaDataShape {
  public applicationIdentifier: string;
  public name: string;
  public iconLocation: string;
  public exeLocation: string;
  public mimeType: MimeTypes;
  public mimeTypes: Array<MimeTypes>;
  public permissions: Array<Permissions>;
  public singleton = false;

  public constructor(init: ApplicationMetaDataShape) {
    Object.assign(this, init);
  }
}

export class IconMetadata implements IconMetadataShape {
  name: string;
  icon?: string;
  exeLocation: string;
  mimeType: MimeTypes;

  constructor(props: IconMetadataShape) {
    this.name = props.name;
    this.icon = props.iconLocation;
    this.exeLocation = props.exeLocation;
    this.mimeType = props.mimeType;
  }
}

export type ApplicationMetaDataObject = {
  [key in ApplicationMetaDataFields]: any;
};
