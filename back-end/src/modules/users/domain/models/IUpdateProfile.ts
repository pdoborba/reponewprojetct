export interface IUpdateProfile {
  user_id: string;
  corporate_name: string;
  fantasy_name: string;
  cnpj: number;
  email: string;
  state_registration: number;
  address: string;
  password?: string;
  old_password?: string;
}
