import { IClub } from "./IClub";

type Weapon = {
  name: string;
  categoria: string;
  modelo: string;
  registro: string;
  validade: string;
  disparos: number;
};

export interface IRegister {
  _id: string;
  ownerID: string;
  name: string;
  cpf: string;
  cr: string;
  weapons: Weapon[];
  club: IClub;
  activity: string;
  createdAt: string;
  updatedAt: string;
}
