export interface IUsers {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface ILogin {
  type: number;
  message: { message: string } | { token: string } | { role: string };
}
