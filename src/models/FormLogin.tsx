import { CredentialsLogin } from "./Credentials-login.model";

export interface FormLoginProps {
  loginUser: (credential: CredentialsLogin) => void;
  pattern_email: RegExp;
}
