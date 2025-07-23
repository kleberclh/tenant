import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

async function createClient(req: Request, res: Response) {
  try {
    const { name, email, enterpriseId } = req.body;

    if (!name || !email || !enterpriseId) {
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
    const cliente = await prisma.client.create({
      data: {
        name,
        email,
        enterprise: {
          connect: { id: enterpriseId },
        },
      },
    });
    res.status(201).json({
      message: "Cliente criado com sucesso!",
      status: 200,
      success: true,
      cliente,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao criar o cliente! Provavelmente um erro no servidor!",
      status: 500,
      success: false,
    });
  }
}

async function getAccountsByClient(req: Request, res: Response) {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).json({
        error: {
          message: "Preencha o id do cliente antes de buscar!",
          status: 400,
          success: false,
        },
      });
      return;
    }

    const userExists = await prisma.client.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!userExists) {
      res.status(404).json({
        error: {
          message: "Cliente não encontrado!",
          status: 404,
          success: false,
        },
      });
      return;
    }
    const getUser = await prisma.client.findUnique({
      where: {
        id: Number(id),
      },

      include: { accounts: true },
    });
    res.json({
      message: "Cliente encontrado com sucesso!",
      status: 200,
      success: true,
      cliente: getUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Erro ao buscar o cliente com a conta! Provavelmente um erro no servidor!",
      status: 500,
      success: false,
    });
  }
}

export default {
  createClient,
  getAccountsByClient,
};
