import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

async function createEnterprise(req: Request, res: Response) {
  try {
    const { name, cnpj } = req.body;

    if (!name || !cnpj) {
      res.status(400).json({
        error: {
          message: "Preencha o nome e o cnpj da empresa antes de criar!",
          status: 400,
          success: false,
        },
      });
      return;
    }

    const existingEnterprise = await prisma.enterprise.findUnique({
      where: { cnpj },
    });

    if (existingEnterprise) {
      res.status(409).json({
        error: {
          message: "Já existe uma empresa cadastrada com esse CNPJ!",
          status: 409,
          success: false,
        },
      });
      return;
    }

    const enterprise = await prisma.enterprise.create({
      data: {
        name,
        cnpj,
      },
    });

    res.status(200).json({
      message: "Empresa criada com sucesso!",
      status: 200,
      success: true,
      enterprise,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao criar a empresa! Provavelmente um erro no servidor!",
      status: 500,
      success: false,
    });
  }
}

async function getAllEnterprise(req: Request, res: Response) {
  try {
    const buscarEmpresas = await prisma.enterprise.findMany();
    res.json(buscarEmpresas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao criar a empresa! Provavelmente um erro no servidor!",
      status: 500,
      success: false,
    });
  }
}

export default {
  createEnterprise,
  getAllEnterprise,
};
