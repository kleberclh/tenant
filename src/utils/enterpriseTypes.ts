export interface CreateEnterpriseBody {
  name: string;
  cnpj: string;
}

export interface EnterpriseParams {
  id: string; // Porque o `req.params` sempre vem como string no Express
}
