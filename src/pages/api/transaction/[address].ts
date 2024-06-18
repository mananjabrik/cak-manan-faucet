import { pesseTesnet } from '@/config';
import { PrismaClient, walet } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createWalletClient, parseEther, publicActions, webSocket, http, formatEther } from 'viem'
import { isAddress } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';

const prisma = new PrismaClient();
const MNEMONIC = process.env.NEXT_PUBLIC_MNEMONIC ?? ''
const account = mnemonicToAccount(
  MNEMONIC
)
const nodeClient = createWalletClient({
  account,
  chain: pesseTesnet,
  transport: http("https://rpc-dev.cakmanan.site")
}).extend(publicActions)

const getAllTransactionByWalletAddress = async (address: string) => {
  if (!isAddress(address)) throw new Error('invalid address');
  const transactionList = await prisma.walet.findMany({
    where: {
      walletAddress: address,
    },
    orderBy: {
      id: "desc"
    }
  });

  // need to convert bigint to number 
  return transactionList.map((e) => {
    return { ...e, value: formatEther(e.value) };
  })

};

const createTransaction = async (address: string, data: Omit<walet, "id">) => {

  const isExist = await prisma.walet.findFirst({
    where: {
      walletAddress: address
    },
    orderBy: {
      id: "desc"
    }
  })

  if (isExist) {
    // Limit one tx per day logic
    const lastTxTime = isExist.timeStamp;
    const today = new Date();

    // Compare only the date part, ignoring time
    const isSameDay = (
      lastTxTime.getFullYear() === today.getFullYear() &&
      lastTxTime.getMonth() === today.getMonth() &&
      lastTxTime.getDate() === today.getDate()
    );

    if (isSameDay) {
      throw new Error("One transaction per day is allowed.");
    }

  } else {
    const createTx = await prisma.walet.create({
      data: data
    })
    if (createTx) {
      return true
    }
    return false
  }

}

const tranferFromHotWallet = async (address: string) => {
  if (!isAddress(address)) throw new Error('invalid address')
  const hash = await nodeClient.sendTransaction({
    to: address,
    value: parseEther('0.1')
  })
  if (!hash) throw new Error('Failed to send transaction');
  const getTransaction = await nodeClient.getTransaction({
    hash: hash
  })

  const block = await nodeClient.getBlock({
    blockHash: getTransaction.blockHash
  })

  return { ...getTransaction, timeStamp: block.timestamp }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const transactionList = await getAllTransactionByWalletAddress(
          req.query.address + ''.toLowerCase()
        );
        res.status(200).json({
          status: 200,
          data: transactionList,
        });
        break;
      case 'POST':
        const tx = await tranferFromHotWallet(req.query.address as string)
        const create = await createTransaction(req.query.address as string, {
          block: Number(tx.blockNumber),
          hash: tx.hash,
          status: true,
          timeStamp: new Date(Number(tx.timeStamp) * 1000),
          value: tx.value,
          walletAddress: req.query.address + ''.toLowerCase()
        })
        res.status(200).json({
          status: 200,
          data: create
        });
        break;
      default:
        // not allowed
        res.status(405).end();
        break;
    }
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ message: e.message });
  }

}
