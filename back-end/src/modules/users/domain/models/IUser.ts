export interface IUser {
  id: string;
  corporate_name: string;
  fantasy_name: string;
  cnpj: number;
  email: string;
  state_registration: number;
  address: string;
  password: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}
