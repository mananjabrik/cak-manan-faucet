import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, walet } from '@prisma/client';

const prisma = new PrismaClient();

const getAllTx = async () => {
  const tx = await prisma.walet.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 4
  });

  return tx.map((e) => {
    return { ...e, value: e.value.toString() }
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        res.status(200).json({
          status: 200,
          data: await getAllTx(),
        });
        break;
      default:
        res.status(405).send("method not allowed");
        break;
    }
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ message: e.message });
  }

}
