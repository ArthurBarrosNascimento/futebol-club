export interface IUsers {
  id: number;
  username: string;
  role: string;
  email: string;
  pasaword: string;
}

export interface ILogin {
  type: number;
  message: { message: string } | { token: string };
}
