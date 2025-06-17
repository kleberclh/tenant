import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

async function createAccounts(req: Request, res: Response) {
  const { description, debt, clientId } = req.body;

  try {
    // Cria a conta
    const newAccount = await prisma.accounts.create({
      data: {
        description,
        debt,
        clientId,
      },
    });

    // Agora soma todas as dívidas desse cliente
    const totalDebt = await prisma.accounts.aggregate({
      where: { clientId },
      _sum: {
        debt: true,
      },
    });

    // Atualiza o campo 'debt' do cliente
    await prisma.client.update({
      where: { id: clientId },
      data: {
        debt: totalDebt._sum.debt || 0,
      },
    });

    res.status(201).json({
      message: "Conta criada e dívida totalizada com sucesso!",
      account: newAccount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao criar a conta!",
    });
  }
}

export default {
  createAccounts,
};
