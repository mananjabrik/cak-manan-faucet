import { formatAddress } from '@/lib';
import { walet } from '@prisma/client';
import axios from 'axios';
import { format, formatDate } from 'date-fns';
import { useEffect, useState } from 'react';
import { formatEther, parseEther } from 'viem';

interface IDto {
  block: number;
  hash: string;
  id: number;
  status: boolean;
  timeStamp: Date;
  value: string;
  walletAddress: string;
}

export const Tracker = () => {
  const [data, setData] = useState<IDto[]>();
  const [loading, setLoading] = useState<boolean>();

  const getLatesTx = async () => {
    try {
      setLoading(true);
      const { data: response } = await axios.get<{
        status: number;
        data: IDto[];
      }>('/api/transaction');
      setData(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLatesTx();
  }, [loading]);

  return (
    <div className="overflow-hidden mt-5 rounded">
      <div className="pb-8">
        <h2 className="text-xl text-center">Tracker</h2>
        <p className="text-center tracking-tighter text-gray-500 md:text-lg dark:text-gray-400">
          Latest Transaction
        </p>
      </div>

      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Claim at
              </th>
              <th scope="col" className="px-6 py-3">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((e) => (
                  <tr
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    key={e.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {formatAddress(e.walletAddress)}
                    </th>
                    <td className="px-6 py-4">
                      PSE {formatEther(BigInt(e.value))}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(e.timeStamp, 'dd MMM yyyy/hh:mm')}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`https://explorer.cakmanan.site/tx/${e.hash}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        target="_blank"
                      >
                        Explorer
                      </a>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
