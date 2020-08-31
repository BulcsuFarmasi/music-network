export enum ProfileErrorType {
  fetch,
}

export interface ProfileError {
  message: string;
  type: ProfileErrorType;
}
