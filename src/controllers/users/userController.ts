import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { CreateUserType } from "../../types/userTypes";
import { hashPassword } from "../../utils/hashPassword";

async function createUser(req: Request<{}, {}, CreateUserType>, res: Response) {
  try {
    const { name, email, password, enterpriseId, role } = req.body;

    const hashedPassword = await hashPassword(password);

    if (!name || !email || !password || !enterpriseId || !role) {
      res.status(400).json({
        error: {
          message: "Preencha todos os campos antes de criar!",
          status: 400,
          success: false,
        },
      });
      return;
    }

    const existingEnterprise = await prisma.enterprise.findUnique({
      where: { id: enterpriseId },
    });

    if (!existingEnterprise) {
      res.status(404).json({
        error: {
          message: "Empresa não encontrada!",
          status: 400,
          success: false,
        },
      });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({
        error: {
          message: "Usuário já cadastrado!",
          status: 400,
          success: false,
        },
      });
      return;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        enterprise: {
          connect: { id: enterpriseId },
        },
      },
    });

    res.status(201).json({
      message: "Usúario criado com sucesso!",
      status: 200,
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao criar o usuário! Provavelmente um erro no servidor!",
      status: 500,
      success: false,
    });
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const buscarUsuarios = await prisma.user.findMany();
    res.json(buscarUsuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Erro ao procurar os usuário! Provavelmente um erro no servidor!",
      status: 500,
      success: false,
    });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      res.status(400).json({
        error: {
          message: "Está faltando o ID",
          status: 400,
          success: false,
        },
      });
      return;
    }
    // Faz o update apenas nos campos enviados
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password,
        role,
      },
    });

    res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao editar o usuário",
      status: 500,
      success: false,
    });
  }
}

export default {
  createUser,
  getAllUsers,
  updateUser,
};
