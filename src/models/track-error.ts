export enum TrackErrorType {
  add,
  delete,
  fetch,
}

export interface TrackError {
  type: TrackErrorType;
  message: string;
}
