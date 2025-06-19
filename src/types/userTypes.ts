export interface CreateUserType {
  name: string;
  email: string;
  password: string;
  enterpriseId: number;
  role: "USER" | "ADMIN";
}
