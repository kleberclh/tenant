import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email e senha são obrigatórios!" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        message: "E-mail ou senha errados!",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: "E-mail ou senha errados!",
      });
      return;
    }

    const secret = process.env.SECRET;
    if (!secret) {
      console.error("SECRET não configurado no .env");
      res.status(500).json({ message: "Erro interno de configuração" });
      return;
    }

    // Buscar o nome da empresa
    const enterprise = await prisma.enterprise.findUnique({
      where: { id: user.enterpriseId },
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        enterpriseId: user.enterpriseId,
        enterpriseName: enterprise?.name || null,
        role: user.role,
      },
      secret,
      {
        expiresIn: "12h",
      }
    );

    res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
      userId: user.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao realizar o login!",
      status: 500,
      success: false,
    });
  }
}

export default {
  loginUser,
};
