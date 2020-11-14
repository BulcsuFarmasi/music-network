import { Profile } from "./profile";

export interface Comment {
  id?: string;
  authorId: string;
  authorProfile?: Profile;
  trackId:string
  text: string;
  creationTime: number;
}
