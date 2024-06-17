import { formatAddress } from '@/lib';
import { format, formatDate } from 'date-fns';

export const Tracker = () => {
  const shortAddressWallet = '0x9B9862654eA3F3cC054276e2A442164cBb2B15F4'; // todo get wallet address
  return (
    <div className="overflow-hidden mt-5 rounded">
      <div>
        <h2 className="text-xl text-center">Tracker</h2>
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
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {formatAddress(shortAddressWallet)}
              </th>
              <td className="px-6 py-4">PSE200</td>
              <td className="px-6 py-4">
                {formatDate(new Date(), 'dd/mm/yy hh:mm')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
