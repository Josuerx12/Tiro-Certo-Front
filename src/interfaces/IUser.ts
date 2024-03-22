/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
  clubs: any[];
  _id: string;
  name: string;
  email: string;
  cpf: string;
  photoURL: string | null;
  admin: boolean;
  founder: boolean;
  updatedAt: string;
  cr: string;
}
