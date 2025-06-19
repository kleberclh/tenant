import { hash } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 8;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};
