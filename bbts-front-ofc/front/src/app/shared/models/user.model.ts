export interface User {
  cpf: string;
  role: 'admin' | 'cliente';
  token: string;
}