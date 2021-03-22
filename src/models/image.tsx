export interface Image {
  url: string;
  id: number;
  width: number;
  height: number;
  user: IUser;
}

export interface IUser {
  username: string;
  email: string;
  name: string;
  lastName: string;
  avatar: string
}
