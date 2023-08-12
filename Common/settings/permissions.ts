export enum Permissions {
  fileSystem,
  backgroundServices,
  notifications,
  location,
  externalRequests,
  applicationContact,
}

export interface PermissionRequestDto {
  applicationId: string;
  permission: Permissions;
}
