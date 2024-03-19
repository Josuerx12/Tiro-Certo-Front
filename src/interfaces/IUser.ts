/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
  clubs: any[];
  _id: string;
  name: string;
  email: string;
  cpf: number;
  photoURL: string | null;
  admin: boolean;
  founder: boolean;
  updatedAt: string;
  cr: number;
}
