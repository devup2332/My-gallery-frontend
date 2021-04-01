export interface UserProfile {
  id?: string | number;
  fullName?: string;
  avatar?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  email?: string;
  provider?: string;
  password?: string;
  phone?: string;
  description?: string;
}
