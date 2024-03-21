export interface IClub {
  logoPath: string | null;
  logoURL: string | null;
  _id: string;
  name: string;
  geoLocation: string;
  cr: string;
  cnpj: string;
  users: string[] | [];
  createdAt: string;
  updatedAt: string;
}
