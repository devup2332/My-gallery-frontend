import { UserProfile } from "./user-profile";

export interface FormUpdateProfileProps {
  user?: UserProfile | null;
  updateUser: any;
  loading: boolean;
}
