export enum TrackErrorType {
  add,
  delete,
  fetch,
  update,
}

export interface TrackError {
  type: TrackErrorType;
  message: string;
  trackId?: string;
}
