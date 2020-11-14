import { Profile } from "./profile";

export interface Comment {
  id?: string;
  authorId: string;
  authorProfile?: Profile;
  text: string;
  creationTime: number;
}
