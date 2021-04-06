import { UserProfile } from "./UserProfile";

export interface Photo {
  secure_url?: string;
  public_id?: string;
  id?: number;
  user: UserProfile;
}
